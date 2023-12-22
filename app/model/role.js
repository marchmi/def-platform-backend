'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const RoleSchema = new Schema({
    uuid: {
      type: String,
    },
    roleName: { // 角色名称
      type: String,
      require: true,
    },
    sysCode: { // 所属系统
      type: String,
      require: true,
    },
    resourceCodes: { // 角色资源
      type: Array,
      require: true,
    },
    type: { // 角色类型
      type: String,
      enum: [ 'ADMIN', 'TENEMENT' ], // 管理员 用户
      default: 'ADMIN',
    },
    remark: { // 属性类型
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  }, {
    timestamps: true,
    strict: false, // 允许插入model中未定义的值
  }); // { timestamps: true } 新增数据默认添加createdAt 和 updatedAt字段
  return mongoose.model('Role', RoleSchema);
};

