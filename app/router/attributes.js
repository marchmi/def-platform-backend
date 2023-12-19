module.exports = app => {
  app.router.resources('attributes', '/api/attributes', app.controller.attributes); // RESTful 风格的 URL 定义
  app.router.get('/common/attributes/enum', app.controller.attributes.enum); // 多个参数
};

