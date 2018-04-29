const mongoose = require('mongoose')
mongoose.set('debug', true)  // lets us see what's happening

const dbURL = process.env.DATABASEURL || 'mongodb://localhost/todo-api'
// const dbURL = process.env.DATABASEURL || 'mongodb://quentinmckay:bubbles1357@ds245548.mlab.com:45548/adv-wbdev-express-todolist'
mongoose.connect(dbURL)  // mongo will create 'todo-api' database if it doesn't exist

mongoose.Promise = Promise  // allows us to use Promises rather than callbacks (set to Promise rather than external Promise library)


module.exports.Todo = require('./todo')  // export the Todo model
