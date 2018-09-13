/* 公共解析器 */
import { BaseContext } from 'koa'

export interface IParams {
  ctx: BaseContext
  message: string
  err?: any
  data?: any
}

export const handleError = ({
  ctx,
  message = '请求失败',
  err = ''
}: IParams) : boolean => {
  ctx.body = {
    code: -1,
    message,
    debug: err
  }
  return false
}

export const handleInnerError = (ctx: BaseContext) => err => handleError({
  ctx,
  message: '服务器内部错误',
  err
})

export const handleSuccess = (
  { ctx, message = '请求成功', data = '' }: IParams
) => {
  ctx.body = { code: 0, message, data }
}
