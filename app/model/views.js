'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const ViewsSchema = new Schema({
    uuid: {
      type: String,
    },
    viewName: { // 视图名称
      type: String,
      require: true,
    },
    type: { // 视图类型
      type: String,
      require: true,
      unique: true,
    },
    remark: { // 备注
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
  return mongoose.model('Views', ViewsSchema);
};
