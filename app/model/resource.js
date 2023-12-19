'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const ResourceSchema = new Schema({
    uuid: {
      type: String,
    },
    resourceName: { // 资源名称
      type: String,
      require: true,
    },
    resourceCode: { // 资源CODE
      type: String,
      require: true,
      unique: true,
    },
    parentResource: { // 父资源CODE
      type: String,
    },
    type: { // 请求方式
      type: String,
      enum: [ 'MENU', 'BUTTON' ],
      default: 'MENU',
    },
    uris: { // 接口集合
      type: Array,
      default: [],
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
  return mongoose.model('Resource', ResourceSchema);
};

