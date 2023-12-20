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
class ResourceController extends Controller {
  // 获取树资源
  async getTree() {
    const { ctx } = this;
    const { resourceCode } = ctx.params;
    if (!resourceCode) {
      ctx.body = {
        code: 204,
        message: '缺少resourceCode参数',
      };
      return;
    }

    // 递归查询资源树
    const tree = await this.findResourceTree(resourceCode);

    ctx.body = { data: { list: tree } };
  }
  // 获取根节点
  async findResourceTree(parentResource) {
    const { ctx } = this;

    // 查询起始资源
    const rootResource = await ctx.service.resource.findOne({ parentResource });

    if (!rootResource) {
      // 若起始资源不存在，返回空树
      return null;
    }

    // 构建根节点
    const rootNode = {
      resourceName: rootResource.resourceName,
      resourceCode: rootResource.resourceCode,
      uuid: rootResource.uuid,
      uris: rootResource.uris,
      remark: rootResource.remark,
      type: rootResource.type,
      parentResource: rootResource.parentResource,
      children: [],
    };

    // 递归查询子孙节点
    await this.findDescendants(rootResource, rootNode);

    return [ rootNode ];
  }

  async findDescendants(resource, parentNode) {
    const { ctx } = this;

    // 查询当前节点的子节点
    const children = await ctx.service.resource.find({ parentResource: resource.resourceCode });

    for (const child of children) {
      // 构建子节点
      const childNode = {
        resourceName: child.resourceName,
        resourceCode: child.resourceCode,
        uuid: child.uuid,
        uris: child.uris,
        remark: child.remark,
        type: child.type,
        parentResource: child.parentResource,
        children: [],
      };

      // 递归查询子孙节点
      await this.findDescendants(child, childNode);

      // 将子节点添加到父节点的子节点列表中
      parentNode.children.push(childNode);
    }
  }

  async show() {
    const { ctx } = this;
    ctx.body = `${JSON.stringify(ctx.params)}`;
  }

  async create() {
    const { ctx } = this;
    const result = await ctx.service.resource.create(ctx.request.body);
    ctx.body = result;
  }

  async update() {
    const { ctx } = this;
    const result = await ctx.service.resource.updateOne(ctx.params.id, ctx.request.body);
    if (!result) {
      ctx.body = { code: 201, message: `未查询到uuid：${ctx.params.id}相关的文档` }; // 采用RESTful风格的路由时，默认path参数为id
      return;
    }
    ctx.body = result;
  }

  async destroy() {
    const { ctx } = this;
    const result = await ctx.service.resource.deleteOne(ctx.params.id);
    ctx.body = result;
  }

}

module.exports = ResourceController;

