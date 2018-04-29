const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo  // so when we require this file we are actually returning the compiled Todo model