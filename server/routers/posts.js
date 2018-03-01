const Router = require('koa-router')
const router = new Router()
const postController = require('../controllers/posts')

router.get('/', postController.indexAction)

module.exports = router