const posts = require('./posts')


// posts.findList().then(console.log)
posts.findListByPage().then(console.log)
// posts.create({
//   title: 'test2',
//   content: 'testcontent'
// }).then(console.log)
// posts.remove('5a97e9422f4b491b2b54ff6e')
// posts.update('5a97e9422f4b491b2b54ff6e', {
//   abstract: '测试摘要'
// })