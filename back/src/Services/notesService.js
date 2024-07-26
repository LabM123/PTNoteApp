const Note = require("../Models/Note")
const User = require("../Models/User")

module.exports = {
    getAllNotesService: async() => {
        const allNotes = await Note.find()
        return allNotes
    },
    getNoteByIdService: async(noteId) => {
        const foundedNote = await Note.findById(noteId)
        if(!foundedNote) throw new Error('Nota no encontrada')
        return foundedNote
    },
    createNoteService: async({userId, title, content}) => {
        const foundedUser = await User.findById(userId)
        if(!foundedUser) throw new Error('Usuario no encontrado')
        const newNote = new Note({title, content, user: foundedUser.id})
        const savedNote = await newNote.save()
        foundedUser.notes.push(savedNote)
        await foundedUser.save()
        return savedNote
    },
    editNoteService: async({noteId, title, content}) => {
        const foundedNote = await Note.findById(noteId)
        if(!foundedNote) throw new Error('Nota no encontrada')
        foundedNote.title = title
        foundedNote.content = content
        await Note.findByIdAndUpdate(noteId, foundedNote)
        return foundedNote
    },
    deleteNoteService: async(noteId) => {
        const deletedNote = await Note.findByIdAndDelete(noteId)
        return deletedNote
    }
}