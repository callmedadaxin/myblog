module.exports = function(app) {
  app.use('/api/posts', require('./posts.js'));
}