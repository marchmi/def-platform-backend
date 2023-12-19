'use strict';

const { Service } = require('egg');
const uuid = require('uuid');

class ResourceService extends Service {
  async findOne(query) {
    const { ctx } = this;
    const result = await ctx.model.Resource.findOne(query, { _id: 0, __v: 0 });

    return result;
  }

  async find(query) {
    const { ctx } = this;
    const result = await ctx.model.Resource.find(query, { _id: 0, __v: 0 });

    return result;
  }

  async create(data) {
    const newUUID = uuid.v4();
    const { ctx } = this;
    const newDoc = { ...data, uuid: newUUID };

    const result = await ctx.model.Resource.create(newDoc);

    const response = {
      data: {
        message: '创建成功',
      },
    };
    return result ? response : null;
  }

  async updateOne(uuid, data) {
    const { ctx } = this;
    const result = await ctx.model.Resource.findOneAndUpdate({ uuid }, data, { new: false }); // { new: true } 返回更新后的文档

    const response = {
      data: {
        message: '更新成功',
      },
    };
    return result ? response : null;
  }

  async deleteOne(uuid) {
    const { ctx } = this;
    const result = await ctx.model.Resource.findOneAndDelete({ uuid }, { new: false }); // { new: true } 返回更新后的文档
    const response = {
      data: {
        message: '删除成功',
      },
    };
    return result ? response : null;
  }

}

module.exports = ResourceService;

