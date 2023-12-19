'use strict';

const { Service } = require('egg');
const uuid = require('uuid');

class InterfaceService extends Service {
  async find() {
    const { ctx } = this;

    // 获取分页参数，默认是第一页，每页10条记录
    const { pageNum = 1, pageSize = 10, keyword, sysCode, type } = ctx.query;

    // 构建查询条件
    const query = { };

    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      query.$or = [
        { interfaceName: { $regex: regex } },
        { interfaceCode: { $regex: regex } },
      ];
    } // 'i' 表示不区分大小写
    sysCode && (query.sysCode = sysCode);
    type && (query.type = type);


    const skip = (pageNum - 1) * pageSize; // 计算跳过的记录条数

    // 使用Model的find方法进行查询，加上条件和分页参数
    const result = await ctx.model.Interface.find(query, { _id: 0, __v: 0 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // 获取符合条件的记录总数
    const total = await ctx.model.Interface.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize); // 计算总页数

    return {
      data: {
        list: result || [],
        total,
        totalPages,
      },
    };
  }

  async enum(sysCode) {
    const { ctx } = this;

    const result = await ctx.model.Interface.find({ sysCode }).select('interfaceName uri -_id'); // 不返回_id字段

    return {
      data: {
        list: result || [],
      },
    };
  }

  async create(data) {
    const newUUID = uuid.v4();
    const { ctx } = this;
    const newDoc = { ...data, uuid: newUUID };

    const result = await ctx.model.Interface.create(newDoc);

    const response = {
      data: {
        message: '创建成功',
      },
    };
    return result ? response : null;
  }

  async updateOne(uuid, data) {
    const { ctx } = this;
    const result = await ctx.model.Interface.findOneAndUpdate({ uuid }, data, { new: false }); // { new: true } 返回更新后的文档

    const response = {
      data: {
        message: '更新成功',
      },
    };
    return result ? response : null;
  }

  async deleteOne(uuid) {
    const { ctx } = this;
    const result = await ctx.model.Interface.findOneAndDelete({ uuid }, { new: false }); // { new: true } 返回更新后的文档
    const response = {
      data: {
        message: '删除成功',
      },
    };
    return result ? response : null;
  }

}

module.exports = InterfaceService;

