import React, {useState} from "react";
import axios from "axios";
import '../assets/styles/admin.scss'
import {Link} from "react-router-dom";

export const RegisterPage = ({ setAuth }) => {
    const [error, setError] = useState('')

    const register = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        try {
            const response =  await axios.post('http://localhost:5000/api/auth/register', formData)

            if (response.status === 201) {
                setAuth({
                    isAuth: true,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    role: response.data.user.role
                })
                localStorage.setItem('JWT', JSON.stringify(response.data.token))
                return undefined
            }
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-page__form" onSubmit={register}>
                <h1>Регистрация</h1>
                <p className="auth-page__label">Ваше имя</p>
                <input type="text" name="name" className="auth-page__input" placeholder="Имя" required/>
                <p className="auth-page__label">E-mail</p>
                <input type="text" name="email" className="auth-page__input" placeholder="email@email.com"
                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                <p className="auth-page__label">Пароль</p>
                <input type="password" name="password" className="auth-page__input" placeholder="Ваш пароль" required/>
                {error ? <p className="auth-page__error">{error}</p> : ''}
                <button className="auth-page__btn">Зарегистрироваться</button>
            </form>
        </div>
    )
}