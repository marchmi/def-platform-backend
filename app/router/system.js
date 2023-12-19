module.exports = app => {
  app.router.resources('system', '/api/system', app.controller.system); // RESTful 风格的 URL 定义
  app.router.get('/common/system/enum', app.controller.system.enum); // 多个参数
};

