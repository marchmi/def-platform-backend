module.exports = app => {
  app.router.resources('interface', '/api/interface', app.controller.interface); // RESTful 风格的 URL 定义
  app.router.get('/common/interface/enum/:sysCode', app.controller.interface.enum); // 多个参数
};

