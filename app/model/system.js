'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const SystemSchema = new Schema({
    uuid: {
      type: String,
    },
    sysName: { // 中文名称
      type: String,
      require: true,
    },
    sysCode: { // 属性名
      type: String,
      require: true,
      unique: true,
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
  return mongoose.model('System', SystemSchema);
};

