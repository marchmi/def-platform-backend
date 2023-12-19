'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const InterfaceSchema = new Schema({
    uuid: {
      type: String,
    },
    interfaceName: { // 接口名称
      type: String,
      require: true,
    },
    uri: { // 资源符
      type: String,
      require: true,
      unique: true,
    },
    url: { // url
      type: String,
      require: true,
    },
    type: { // 请求方式
      type: String,
      enum: [ 'GET', 'POST', 'PUT', 'UPDATE', 'DELETE' ],
      default: 'GET',
    },
    sysCode: { // 所属系统
      type: String,
      require: true,
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
  return mongoose.model('Interface', InterfaceSchema);
};

