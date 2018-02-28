const Koa = require('koa')
const config = require('../config')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const router = require('./routers')
const mongoose = require('mongoose')
const app = new Koa()

mongoose.connect(config.mongodb)

// static files
app.use(static(config.dist))

// use body parser
app.use(bodyParser())

// route
app.use(router.routes())
  .use(router.allowedMethods())
  
app.listen(config.port, err => {
  console.log(`server is listiening on port ${config.port}`)
})