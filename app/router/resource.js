module.exports = app => {
  app.router.resources('resource', '/api/resource', app.controller.resource); // RESTful 风格的 URL 定义
  app.router.get('/api/resource/tree/:resourceCode', app.controller.resource.getTree); // 多个参数
};

