const express = require('express')
const { getAllUsers, getUserById, registerUser, loginUser } = require('../Controllers/usersController')
const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/register', registerUser)
usersRouter.post('/login', loginUser)

module.exports = usersRouter