module.exports = app => {
  app.router.resources('components', '/api/components', app.controller.components); // RESTful 风格的 URL 定义
  app.router.get('/common/components/enum', app.controller.components.enum); // 多个参数
};

