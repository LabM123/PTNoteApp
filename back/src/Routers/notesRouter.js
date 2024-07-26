const express = require('express')
const { getAllNotes, getNoteById, createNote, editNote, deleteNote } = require('../Controllers/notesController')
const notesRouter = express.Router()

notesRouter.get('/', getAllNotes)
notesRouter.get('/:id', getNoteById)
notesRouter.post('/submitNote', createNote)
notesRouter.put('/editNote/:id', editNote)
notesRouter.delete('/deleteNote/:id', deleteNote)

module.exports = notesRouter