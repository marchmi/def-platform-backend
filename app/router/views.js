module.exports = app => {
  app.router.resources('views', '/api/views', app.controller.views); // RESTful 风格的 URL 定义
  app.router.get('/common/views/enum', app.controller.views.enum); // 多个参数
};

