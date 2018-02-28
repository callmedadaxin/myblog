const Router = require('koa-router')
const router = new Router()
const posts = require('./posts')

router.use('/posts', posts.routes(), posts.allowedMethods())

module.exports = router