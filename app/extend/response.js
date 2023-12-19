/**
 * response 编写生成各种返回结果的工具函数
 */
// app/extend/response.js
module.exports = {
  repetitive(res) {
    const { message, data = {} } = res;
    return { code: 201, data, message };
  },
  test() {
    console.log('测试在中间件中调用extend下的方法，方便后续在进入controller中之前就处理完本次请求的执行结果');
  },
};

