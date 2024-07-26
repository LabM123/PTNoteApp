const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const usersRouter = require('./Routers/usersRouter')
const notesRouter = require('./Routers/notesRouter')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/users', usersRouter)
app.use('/notes', notesRouter)

module.exports = app