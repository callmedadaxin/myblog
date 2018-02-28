const Router = require('koa-router')
const router = new Router()
const PostController = require('../controllers/posts')
const postController = new PostController()

router.get('/', postController.indexAction)

module.exports = router