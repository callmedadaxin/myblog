module.exports = function(app) {
  app.use('/api/type', require('./type.js'));
  app.use('/api/tag', require('./tag.js'));
  app.use('/api/posts', require('./posts.js'));
}