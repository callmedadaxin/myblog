import * as Koa from 'koa'
import * as kcors from 'kcors'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import { router } from './routers'
import { Environment } from './environments'
const KoaCustomResponse = require('koa-respond')

import './connection'

export const createServer = async(): Promise<any> => {
  const app = new Koa()
  
  app.use(kcors())
  
  Environment.identity !== 'test' && app.use(logger())
  
  app.use(bodyParser())
  
  app.use(KoaCustomResponse())
  
  app.use(router.routes()).use(router.allowedMethods())
  
  return app
}
