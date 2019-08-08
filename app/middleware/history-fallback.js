'use strict';
module.exports = () => {
  return async function historyFallback(ctx, next) {
    console.log('我是路由', ctx.request.url);
    await next();
  };
};
