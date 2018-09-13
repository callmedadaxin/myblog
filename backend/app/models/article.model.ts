import { Document, Schema, Model, model, connection } from 'mongoose'
import autoIncrement = require('mongoose-auto-increment')
import mongoosePaginate = require('mongoose-paginate')
import { Tag } from './tag.model'
import { Type } from './type.model'

autoIncrement.initialize(connection)

export interface Article extends Document {
  // 文章标题
  title: string,

  // 描述
  desc: string,

  // 文章内容
  content: string,

  // 创建时间
  create_at: Date,

  // 修改时间
  update_at: Date,

  // 缩略图
  thumb: string,

  // 状态 1 发布 2 删除
  status: number,

  // 标签
  tag: Tag[],

  // 分类
  type: Type
}

const ArticleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },

  desc: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  create_at: {
    type: Date,
    default: Date.now
  },

  update_at: {
    type: Date,
    default: Date.now
  },

  thumb: {
    type: String
  },

  status: {
    type: Number,
    default: 1
  },
  
  tag: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],

  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type'
  }
})

// 转化为普通object对象
ArticleSchema.set('toObject', { getters: true })

// 分页
ArticleSchema.plugin(mongoosePaginate)

// 自增
ArticleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})


export const ArticleModel: Model<Article> = model<Article>('Session', ArticleSchema)
