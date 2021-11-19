//external import
const express = require('express')
const mongoose = require('mongoose');
const router = require('./Todo/ToDoHandler');
const userRouter = require('./user/UserHandler');
const env = require('dotenv');
const app = express();

env.config()

mongoose.connect(process.env.CONNCETION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    .then(() => console.log("database connect"))
    .catch(err => console.log(err))



app.use(express.json())

app.use('/todo', router)

app.use('/', userRouter)



app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).send(err.message)

})

app.get('https://p-to-dos.herokuapp.com/', (req, res) => {
    res.send("Welcome My To-Do Server")
})
app.listen(process.env.PORT, () => {

    console.log('i am listening')

})






