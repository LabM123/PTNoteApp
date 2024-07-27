import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import addNoteIcon from '../../Assets/addNoteIcon.svg'
import NoteCard from '../../Components/NoteCard/NoteCard'

export default function Dashboard(){
    const NoteAppUser = JSON.parse(localStorage.getItem('NoteAppUser'))

    const navigate = useNavigate()

    useEffect(()=>{
        console.log(NoteAppUser) // TEMPORAL
        document.title = 'NoteApp | Dashboard'
        if(!NoteAppUser){
            Swal.fire({
                title: 'Oops...',
                text: 'Debes estar logeado para acceder',
                icon: 'warning'
            })
            navigate('/')
        } else {
            axios.get(`${import.meta.env.VITE_API_URL}/users/${NoteAppUser._id}`)
                .then(response => {
                    localStorage.setItem('NoteAppUser',JSON.stringify(response.data))
                })
                .catch(error => {
                    Swal.fire({title: 'Oops...', text: error.response.data.message, icon: 'error'})
                })
        }
    }, [NoteAppUser, navigate])

    const [allNotes, setAllNotes] = useState(NoteAppUser.notes)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const initialStateNewNote = {
        title: '',
        content: ''
    }

    const [newNote, setNewNote] = useState(initialStateNewNote)

    const handleChangeNewNote = (e) => {
        setNewNote({
            ...newNote,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitNewNote = (e) => {
        e.preventDefault()
        if(!newNote.content || !newNote.title) Swal.fire({title: 'Oops...', text: 'Debe haber por lo menos un titulo y contenido', icon: 'warning'})
        else {
            axios.post(`${import.meta.env.VITE_API_URL}/notes/submitNote`, {...newNote, userId: NoteAppUser._id})
            .then(() => {
                Swal.fire({title: 'Envio exitoso', icon: 'success'})
                axios.get(`${import.meta.env.VITE_API_URL}/users/${NoteAppUser._id}`)
                setIsModalOpen(!isModalOpen)
                .then(response => {
                    localStorage.setItem('NoteAppUser',JSON.stringify(response.data))
                    setAllNotes(JSON.parse(localStorage.getItem('NoteAppUser')).notes)
                })
                .catch(error => {
                    Swal.fire({title: 'Oops...', text: error.response.data.message, icon: 'error'})
                })
            })
            .catch(error => {
                Swal.fire({title: 'Oops...', text: error.response.data.message, icon: 'error'})
            })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('NoteAppUser')
        navigate('/')
    }

    return(
        <div className={styles['body']}>
            <div className={styles['NavBar']}>
                <button onClick={handleLogout}>Cerrar Sesion</button>
            </div>
            <div className={styles['AddNoteSection']} onClick={() => {setIsModalOpen(!isModalOpen)}}>
                <img src={addNoteIcon} alt="" />
                <p>Crea una nueva nota</p>
            </div>
            <div className={styles['NotesSection']}>
                {
                    allNotes.map(note => {
                        return <NoteCard props={note}/>
                    })
                }
            </div>
            {
                isModalOpen
                ?
                <div className={styles['NewNoteModal']}>
                    <form onSubmit={handleSubmitNewNote}>
                        <div className={styles['label']}>
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name='title' id='title' value={newNote.title} onChange={handleChangeNewNote}/>
                        </div>
                        <div className={styles['label']}>
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" id="content" value={newNote.content} onChange={handleChangeNewNote}></textarea>
                        </div>
                        <button type='submit'>Enviar</button>
                    </form>
                </div>
                : 
                null
            }
        </div>
    )
}