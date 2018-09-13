import { Context } from 'koa'
import { Type, TypeModel } from '../models/type.model'
import { handleSuccess, handleError, handleInnerError } from '../helpers/handler';
import BaseController from './base.controller';

export default class TypeController extends BaseController {
  /**
   * 创建分类
   */
  public async create (ctx: Context) {
    const { name, desc } = ctx.request.body
    const data = {
      name,
      desc
    }
    this.validate(data, {
      name: {
        required: true
      }
    })
    this.ok()
    const type = await new TypeModel({
      name,
      desc
    }).save()
    .catch(handleInnerError(ctx))

    if (type) {
      handleSuccess({
        ctx,
        message: '创建成功',
        data: type
      })
    }
  }
  /**
   * 删除
   */
  public static async delete (ctx: Context) {
    const { id } = ctx.params

    if (!id) {
      return handleError({
        ctx,
        message: 'id不能为空!'
      })
    }

    const ret = await TypeModel.findByIdAndRemove(id)
      .catch(handleInnerError(ctx))
    
    if (ret) {
      handleSuccess({
        ctx,
        message: '删除成功',
        data: ret
      })
    }
  }
}
