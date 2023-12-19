// app/middleware/addStatus.js
module.exports = () => {
  return async function addStatusCode(ctx, next) {
    await next();
    const code = ctx.body.code || 200;
    ctx.body = {
      ...ctx.body,
      code,
    };
  };
};

