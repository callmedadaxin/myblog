const path = require('path')
module.exports = {
  port: 3000,
  mongodb: 'mongodb://localhost:27017/myblog',
  dist: path.join(__dirname, './dist'),
  // mongodb: 'mongodb://119.23.77.225:27017/myblog',
  'ACCESS_KEY': '4W-FKHsgiZKAqPPtdPtcH_cd1K3cxQspGIGh93T0', // https://portal.qiniu.com/user/key
  'SECRET_KEY': 'YWyHoeJIxeoJuBDRyYZh9Gxrn9KGq9bR0FuFwvsL',
  'Bucket_Name': 'blog-images',
  'Uptoken_Url': 'uptoken',
  'Domain': '<Your Bucket Name>' // bucket domain eg:http://qiniu-plupload.qiniudn.com/
}