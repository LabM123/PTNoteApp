import styles from './NoteCard.module.css'
import editNoteIcon from '../../Assets/editNoteIcon.svg'
import deleteNoteIcon from '../../Assets/deleteNoteIcon.svg'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function NoteCard({props}){
    const NoteAppUser = JSON.parse(localStorage.getItem('NoteAppUser'))

    const navigate = useNavigate()

    const [isEditable, setIsEditable] = useState(false)

    const [newNote, setNewNote] = useState({
        title: props.title,
        content: props.content
    })

    const handleChange = (e) => {
        setNewNote({
            ...newNote,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitEditNote = () => {
        if(!newNote.title || !newNote.content) Swal.fire({title: 'Oops...', text: 'Debe tener titulo y contenido', icon: 'warning'})
        else {
            axios.put(`${import.meta.env.VITE_API_URL}/notes/editNote/${props._id}`, newNote)
            .then(() => {
                axios.get(`${import.meta.env.VITE_API_URL}/users/${NoteAppUser._id}`)
                .then(response => {
                    localStorage.setItem('NoteAppUser',JSON.stringify(response.data))
                    navigate('/dashboard')
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

    const handleDeleteNote = () => {
        console.log('xd')
        axios.delete(`${import.meta.env.VITE_API_URL}/notes/deleteNote/${props._id}`)
        .then(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/users/${NoteAppUser._id}`)
            .then(response => {
                localStorage.setItem('NoteAppUser',JSON.stringify(response.data))
                navigate('/dashboard')
            })
            .catch(error => {
                Swal.fire({title: 'Oops...', text: error.response.data.message, icon: 'error'})
            })
        })
        .catch(error => {
            Swal.fire({title: 'Oops...', text: error.response.data.message, icon: 'error'})
        })
    }

    return(
        <div className={styles['CardBody']}>
            <div className={styles['IconSection']}>
                <img src={editNoteIcon} alt="" onClick={() => {setIsEditable(!isEditable)}}/>
                <img src={deleteNoteIcon} alt="" onClick={() => {handleDeleteNote}}/>
            </div>
            <div className={styles['NoteSection']}>
                {
                    isEditable
                    ?
                    <>
                        <input type="text" value={newNote.title} name='title' id='title' onChange={handleChange}/>
                        <input type="text" value={newNote.content} name='content' id='content' onChange={handleChange}/>
                        <button onClick={handleSubmitEditNote}>Enviar</button>
                    </>
                    :
                    <>
                        <p>{props.title}</p>
                        <p>{props.content}</p>
                    </>
                }
            </div>
        </div>
    )
}