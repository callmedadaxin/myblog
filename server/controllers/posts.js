const BaseController = require('./base')
const postService = require('../service/posts')

class PostController extends BaseController {
  async indexAction (ctx) {
    const postList = await postService.findList()
    console.log(postList)
    ctx.body = {
      code: 200,
      data: postList
    }
  }
}

module.exports = new PostController()
