const { getAllNotesService, getNoteByIdService, createNoteService, editNoteService, deleteNoteService } = require("../Services/notesService")

module.exports = {
    getAllNotes: async(req, res) => {
        try {
            const allNotes = await getAllNotesService()
            res.status(200).json(allNotes)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getNoteById: async(req, res) => {
        try {
            const noteId = req.params.id
            if(!noteId) throw new Error('No hay noteId en params')
            const note = await getNoteByIdService(noteId)
            res.status(200).json(note)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    createNote: async(req, res) => {
        try {
            const {userId, title, content} = req.body
            if(!userId || !title || !content) throw new Error('Informacion incompleta')
            const newNote = await createNoteService({userId, title, content})
            res.status(200).json(newNote)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    editNote: async(req, res) => {
        try {
            const noteId = req.params.id
            const {title, content} = req.body
            if(!noteId || !title || !content) throw new Error('Informacion incompleta')
            const newNote = await editNoteService({noteId, title, content})
            res.status(200).json(newNote)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    deleteNote: async(req, res) => {
        try {
            const noteId = req.params.id
            if(!noteId) throw new Error('No hay noteId en params')
            const deletedNote = await deleteNoteService(noteId)
            res.status(200).json(deletedNote)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
}