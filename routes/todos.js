const express = require('express')
const router = express.Router()



// === bring in models ===
const db = require('../models')


// === Index route ===
router.get('/', (req, res) => {
    // res.send('hello from todos route')
    db.Todo.find()  // find all the Todos
    .then(todos => res.json(todos))  // send the json data. could also do res.send(data)
    .catch(err => res.send(err))
})

// === Create route ===
router.post('/', (req, res) => {
    console.log(req.body)
    db.Todo.create(req.body)
    .then(newTodo => res.status(201).json(newTodo))  // or res.send(newTodo)  (note: optionally set status code to 201 (created))
    .catch(err => res.send(err))
})

// === Show route ===
router.get('/:todoID', (req, res) => {
    db.Todo.findById(req.params.todoID)
    .then(foundTodo => res.json(foundTodo))
    .catch(err => res.send(err))
})

// === Update route ===
router.put('/:todoID', (req, res) => {
    // {new: true} means send the updated object back
    db.Todo.findOneAndUpdate({_id: req.params.todoID}, req.body, {new: true})
    .then(todo => res.json(todo))
    .catch(err => res.send(todo))
})

// === Delete route ===
router.delete('/:todoID', (req, res) => {
    db.Todo.remove({_id: req.params.todoID})  // pass object with key we want it to remove by
    .then(() => { res.json({message: 'We deleted it!'})})
    .catch(err => res.send(err))
})


module.exports = router