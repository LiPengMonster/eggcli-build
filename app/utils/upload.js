/*
 * @Author: 李鹏
 * @Date: 2019-03-03 11:55:41
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-06-20 15:16:37
 * 常量表
 */
'use strict';

const path = require('path');
// const sendToWormhole = require('stream-wormhole');
const random = require('string-random');
const fs = require('fs');
// const awaitWriteStream = require('await-stream-ready').write;

module.exports = {

  uploadfile({
    data,
    encode,
    filename,
    basedir,
    writepath,
  }) { // 上传头像图片，需要字段,id,图片,然后随机生成名称，保存到本地,然后保存数据库

    return new Promise(function(resolve, reject) {
      // ... some code
      let dataBuffer;
      const current = Math.floor(Date.now() / 1000);
      const _filename = random() + current + filename.toLocaleLowerCase();
      const target = path.join(basedir, writepath, _filename);
      switch (encode) {
        case 'base64': {
          const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
          dataBuffer = Buffer.from(base64Data, 'base64');
          fs.writeFile(target, dataBuffer, err => {
            if (err) {
              reject(err);
            }
            resolve({
              _filename,
            });
          });
        }
          break;
        default: { // 默认读取流
          const remoteFileStream = fs.createWriteStream(target);
          data.pipe(remoteFileStream);
          let errFlag;
          remoteFileStream.on('error', err => {
            errFlag = true;
            remoteFileStream.destroy();
            reject(err);
          });

          remoteFileStream.on('finish', async () => {
            if (errFlag) return;
            resolve({
              _filename,
            });
          });
        }
          break;
      }
    });
  },
};
