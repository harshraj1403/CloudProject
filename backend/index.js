require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const courseRoutes = require('./routes/courses')
const userRoutes = require('./routes/user')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/courses', courseRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
})
.catch((error) => {
    console.log(error);
})

