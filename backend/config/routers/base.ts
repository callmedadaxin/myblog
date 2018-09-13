import TypeController from "../../app/controllers/type.controller";

const router = require('koa-router')()

export default router
  .post('/type', TypeController.create)
  .post('/type/delete/:id', TypeController.delete)