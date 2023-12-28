'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const AccountSchema = new Schema({
    uuid: {
      type: String,
    },
    realName: { // 姓名
      type: String,
      require: true,
    },
    account: { // 账号
      type: String,
      require: true,
    },
    mobile: { // 电话
      type: String,
      require: true,
    },
    email: { // 邮箱
      type: String,
      require: true,
    },
    roles: { // 角色id
      type: Array,
      require: true,
    },
    type: { // 账号类型
      type: String,
      enum: [ 'ADMIN', 'TENEMENT', 'USER' ], // 管理员 用户
      default: 'ADMIN',
    },
    remark: {
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
  return mongoose.model('Account', AccountSchema);
};

