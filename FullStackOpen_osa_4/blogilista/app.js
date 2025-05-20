const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const usersRouter = require('./controllers/users')

const blogsRouter = require('./controllers/blogs')

const loginRouter = require('./controllers/login')

app.use('/api/login', loginRouter)

app.use('/api/users', usersRouter)

app.use('/api/blogs', blogsRouter)

module.exports = app
