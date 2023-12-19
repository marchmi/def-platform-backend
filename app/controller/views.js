'use strict';

const { Controller } = require('egg');

/**
 * RESTful 风格的 URL与方法对照表
 * method     path               routeName     controller.action
 * GET        /views             views        controller.views.index   // 列表
 * GET        /views/new         new_view     controller.views.new
 * GET        /views/:id         view         controller.views.show    // 详情
 * GET        /views/:id/edit    edit_view    controller.views.edit
 * POST       /views             views        controller.views.create  // 新增
 * PUT        /views/:id         view         controller.views.update  // 更新
 * DELETE     /views/:id         view         controller.views.destroy // 删除
 */
class ViewsController extends Controller {
  async index() {
    const { ctx } = this; // ctx.query get请求参数 ctx.request.body post请求提交参数
    // console.log(this.app.mongoose); // https://blog.csdn.net/sd19871122/article/details/122276538
    const result = await ctx.service.views.find();
    // ctx.body = `${JSON.stringify(ctx.query)}`;
    ctx.body = result;
  }

  async show() {
    const { ctx } = this;
    ctx.body = `${JSON.stringify(ctx.params)}`;
  }

  async create() {
    const { ctx } = this;
    const result = await ctx.service.views.create(ctx.request.body);
    ctx.body = result;
  }

  async update() {
    const { ctx } = this;
    const result = await ctx.service.views.updateOne(ctx.params.id, ctx.request.body);
    if (!result) {
      ctx.body = { code: 201, message: `未查询到uuid：${ctx.params.id}相关的文档` }; // 采用RESTful风格的路由时，默认path参数为id
      return;
    }
    ctx.body = result;
  }

  async destroy() {
    const { ctx } = this;
    const result = await ctx.service.views.deleteOne(ctx.params.id);
    ctx.body = result;
  }

  async enum() { // 获取枚举数据
    const { ctx } = this;
    const result = await ctx.service.views.enum();
    ctx.body = result;
  }
}

module.exports = ViewsController;
