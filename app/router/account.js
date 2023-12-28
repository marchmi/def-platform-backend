module.exports = app => {
  app.router.resources('account', '/api/account', app.controller.account); // RESTful 风格的 URL 定义
};

