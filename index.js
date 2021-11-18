//external import
const express = require('express')
const mongoose = require('mongoose');
const router = require('./Todo/ToDoHandler');
const userRouter = require('./user/UserHandler');
const app = express();



mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    .then(() => console.log("database connect"))
    .catch(err => console.log(err))



app.use(express.json())

app.use('/todo', router)

app.use('/', userRouter)



app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).send(err.message)

})

app.get('/', (req, res) => {
    res.send("Welcome My To-Do Server")
})
app.listen(5000, () => {

    console.log('i am listening')

})






