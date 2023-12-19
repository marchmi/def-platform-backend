/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1691474135958_7005';

  // add your middleware config here
  config.middleware = [ 'addStatusCode', 'errorHandler' ];

  config.mongoose = {
    url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1/R',
    options: {
      // server: { // 为什么要去掉外层的server：https://segmentfault.com/q/1010000010447504
      // poolSize: 40, // 连接池数量：https://static2.cnodejs.org/topic/5b471c93e374eeab6929d657
      // useUnifiedTopology: true, // https://blog.csdn.net/xuelang532777032/article/details/124712178
      // },
    },
  };

  // 跨域相关：https://www.eggjs.org/zh-CN/basics/controller#session
  config.security = { // 直接关闭CSRF验证，不推荐 https://www.eggjs.org/zh-CN/basics/router#%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96
    csrf: { enable: false },
  };

  config.cors = {
    origin: 'http://localhost:8090', // 设置允许跨域的源，可根据需要修改为特定的源地址，如'http://localhost:3000'
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 设置允许跨域请求的HTTP方法
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
