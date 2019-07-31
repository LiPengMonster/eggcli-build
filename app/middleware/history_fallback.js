'use strict';
module.exports = () => {
  return async function historyFallback(ctx, next) {
    console.log(typeof ctx);
    console.log(typeof next);
    await next();
    // console.log(ctx.request.url);
  };
};
