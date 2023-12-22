module.exports = app => {
  app.router.resources('dict', '/api/dict', app.controller.dict); // RESTful 风格的 URL 定义
};

