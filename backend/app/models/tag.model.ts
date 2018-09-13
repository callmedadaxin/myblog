import { Document, Schema, Model, model, connection } from 'mongoose'
import autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(connection)

export interface Tag extends Document {
  // 标签名称
  name: string,

  // 标签描述
  desc: string
}

const TagSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },

  desc: {
    type: String
  }
})

// 自增
TagSchema.plugin(autoIncrement.plugin, {
  model: 'Tag',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

export const TagModel: Model<Tag> = model<Tag>('Tag', TagSchema)
