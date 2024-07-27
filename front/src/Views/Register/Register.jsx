import { useEffect, useState } from 'react'
import styles from './Register.module.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register(){
    const navigate = useNavigate()

    useEffect(()=>{
        document.title = 'NoteApp | Registro'
    }, [])

    const initialState = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [newUser, setNewUser] = useState(initialState)

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!newUser.email || !newUser.password || !newUser.confirmPassword) Swal.fire({title: 'Oops...', text: 'Debes poner un email, contraseña y confirmarla', icon: 'warning'})
        else if(newUser.password !== newUser.confirmPassword) Swal.fire({title: 'Oops...', text: 'Ambas contraseñas deben ser iguales', icon: 'warning'})
        else{
            axios.post(`${import.meta.env.VITE_API_URL}/users/register`, newUser)
            .then(() => {
                Swal.fire({
                    title: 'Registro Exitoso',
                    icon: 'success'
                })
                navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    title: 'Oops...',
                    text: error.response.data.message,
                    icon: 'error'
                })
            })
        }
    }

    return(
        <div className={styles['body']}>
            <form onSubmit={handleSubmit}>
                <Link to={'/'}>{'< Iniciar Sesion'}</Link>
                <h3>Registrate</h3>
                <div className={styles['label']}>
                    <label htmlFor="email">Correo</label>
                    <input type="email" name='email' id='email' onChange={handleChange}/>
                </div>
                <div className={styles['label']}>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name='password' id='password' onChange={handleChange}/>
                </div>
                <div className={styles['label']}>
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input type="password" name='confirmPassword' id='confirmPassword' onChange={handleChange}/>
                </div>
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}