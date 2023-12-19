'use strict';

const { Service } = require('egg');
const uuid = require('uuid');

class ViewsService extends Service {
  async find() {
    const { ctx } = this;

    // 获取分页参数，默认是第一页，每页10条记录
    const { pageNum = 1, pageSize = 10, keyword } = ctx.query;

    // 构建查询条件
    const query = {};

    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      query.$or = [
        { type: { $regex: regex } },
        { viewName: { $regex: regex } },
      ];
    } // 'i' 表示不区分大小写


    const skip = (pageNum - 1) * pageSize; // 计算跳过的记录条数

    // 使用Model的find方法进行查询，加上条件和分页参数
    const result = await ctx.model.Views.find(query, { _id: 0, __v: 0 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // 获取符合条件的记录总数
    const total = await ctx.model.Views.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize); // 计算总页数

    return {
      data: {
        list: result || [],
        total,
        totalPages,
      },
    };
  }

  async enum() {
    const { ctx } = this;

    const result = await ctx.model.Views.find({}).select('viewName type -_id'); // 只返回viewName和type字段，不返回_id字段

    return {
      result,
    };
  }

  async create(data) {
    const newUUID = uuid.v4();
    const { ctx } = this;
    const newDoc = { ...data, uuid: newUUID };

    const result = await ctx.model.Views.create(newDoc);

    const response = {
      data: {
        message: '创建成功',
      },
    };
    return result ? response : null;
  }

  async updateOne(uuid, data) {
    const { ctx } = this;
    const result = await ctx.model.Views.findOneAndUpdate({ uuid }, data, { new: false }); // { new: true } 返回更新后的文档

    const response = {
      data: {
        message: '更新成功',
      },
    };
    return result ? response : null;
  }

  async deleteOne(uuid) {
    const { ctx } = this;
    const result = await ctx.model.Views.findOneAndDelete({ uuid }, { new: false }); // { new: true } 返回更新后的文档
    const response = {
      data: {
        message: '删除成功',
      },
    };
    return result ? response : null;
  }

}

module.exports = ViewsService;
