import * as mongoose from 'mongoose'
import { Environment } from './environments'
import autoIncrement = require('mongoose-auto-increment')

;(<any>mongoose).Promise = global.Promise
const { user, password, host, port, database } = Environment.mongo
const path = `mongodb://${user}:${password}@${host}:${port}/${database}`

mongoose.connection
.once('error', err => console.log(`mongodb connect error:\n${err}`))
.once('open', () => {
  Environment.identity !== 'test' && console.log('mongodb connect success')
})

mongoose.connect(path, {
  useNewUrlParser: true
})
.then().catch(e => console.log(e))

export {
  mongoose,
}
