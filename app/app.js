'use strict';

// app.js
/**
 * 执行流程
 * 1.app.js  => 2.router.js  => 3.挂载router目录下的路由文件  => 4.指定controller
 * => 5.controller中调用service  => 6.service调用model  => 7.service返回执行结果
 * => 8.controller响应请求
 *
 * 编写流程
 * model => service => controller => router
 * service匹配到，接口未匹配到时，响应如下内容，未抛出404
 * {
    "0": "{",
    "1": "\"",
    "2": "i",
    "3": "d",
    "4": "\"",
    "5": ":",
    "6": "\"",
    "7": "t",
    "8": "r",
    "9": "e",
    "10": "e",
    "11": "\"",
    "12": "}",
    "code": 200
}
 */

module.exports = app => {
  app.once('server', server => {
    console.log(server);
    // websocket
  });
  app.on('error', (err, ctx) => {
    console.log(err, ctx);
    // report error
  });
  app.on('request', ctx => {
    console.log(ctx);
    // log receive request
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    console.log(used);
    // log total cost
  });
};
