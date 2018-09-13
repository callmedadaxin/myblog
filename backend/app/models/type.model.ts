import { Document, Schema, Model, model, connection } from 'mongoose'
import autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(connection)

export interface Type extends Document {
  // 标签名称
  name: string,

  // 标签描述
  desc: string
}

const TypeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },

  desc: {
    type: String
  }
})

// 自增
TypeSchema.plugin(autoIncrement.plugin, {
  model: 'Type',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

export const TypeModel: Model<Type> = model<Type>('Type', TypeSchema)
