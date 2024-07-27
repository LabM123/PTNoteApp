import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Home(){
    useEffect(()=>{
        document.title = 'NoteApp | Login'
    }, [])

    const navigate = useNavigate()

    const initialState = {
        email: '',
        password: ''
    }

    const [newLogin, setNewLogin] = useState(initialState)

    const handleChange = (e) => {
        setNewLogin({
            ...newLogin,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!newLogin.password || !newLogin.email) Swal.fire({title: 'Oops...', text: 'Ingresa un email y contraseña', icon: 'warning'})
        else {
            axios.post(`${import.meta.env.VITE_API_URL}/users/login`, newLogin)
            .then(response => {
                localStorage.setItem('NoteAppUser', JSON.stringify(response.data))
                navigate('/dashboard')
            })
            .catch(error => {
                Swal.fire({title: 'Oops...', text: error.response.data.message, icon: 'error'})
                console.log(error)
            })
        }
    }

    return(
        <div className={styles['body']}>
            <form className={styles['form']} onSubmit={handleSubmit}>
                <h2>Bienvenido a NoteApp</h2>
                <h3>Inicia Sesion</h3>
                <div className={styles['label']}>
                    <label htmlFor="">Correo Electronico</label>
                    <input type="email" id='email' name='email' onChange={handleChange} value={newLogin.email}/>
                </div>
                <div className={styles['label']}>
                    <label htmlFor="">Contraseña</label>
                    <input type="password" id='password' name='password' onChange={handleChange} value={newLogin.password}/>
                </div>
                <button type='submit'>Ingresa</button>
                <div className={styles['register-div']}>
                    <p>No tienes cuenta?</p>
                    <Link to={'/register'}>Registrate</Link>
                </div>
            </form>
        </div>
    )
}