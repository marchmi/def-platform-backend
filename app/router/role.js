module.exports = app => {
  app.router.resources('system', '/api/role', app.controller.role); // RESTful 风格的 URL 定义
  app.router.get('/common/role/enum', app.controller.role.enum); // 多个参数
};

