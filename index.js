const express = require('express')
const app = express()


// === body parser stuff === (don't need this anymore)
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))


// === express >4.6 includes body-parser again ===
// so we can access req.body inside routes (?)(not entirely sure)
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// tell express where to find static files
// use __dirname so this server file can be run from anywhere (__dirname is the path to directory of *this* file)
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))


// create root route
app.get('/', (req, res) => {
    res.sendFile('index.html')
})


// create todo routes
const todoRoutes = require('./routes/todos')
app.use('/api/todos', todoRoutes)  // this way we don't have to write '/api/todos/' in front of every route



// start the server
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})