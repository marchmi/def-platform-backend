// app/middleware/mongoError.js
module.exports = () => {
  return async function mongoError(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err.name === 'MongoServerError') {
        // 处理 MongoDB 错误并返回适当的响应
        ctx.body = { code: 403, error: err, message: JSON.stringify(err) };
      } else {
        // 将其他类型的错误继续向下传递
        ctx.body = err;
      }
    }
  };
};
