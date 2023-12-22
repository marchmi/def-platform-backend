'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const DictSchema = new Schema({
    uuid: {
      type: String,
    },
    dictName: { // 字典名称
      type: String,
      require: true,
    },
    dictCode: { // 字典CODE
      type: String,
      require: true,
      unique: true,
    },
    dictValue: { // 字典数据
      type: String,
      default: '',
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
  return mongoose.model('Dict', DictSchema);
};

