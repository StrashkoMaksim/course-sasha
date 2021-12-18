import React, {useState} from 'react'
import LogoImg from "../assets/img/logo.jpg"
import {Link} from "react-router-dom"
import classNames from "classnames";

const AdminLayout = ({ setAuth, children }) => {
    const [linksVisible, setLinksVisible] = useState(false)

    const linksToggleHandler = () => {
        setLinksVisible(!linksVisible)
    }

    const logout = () => {
        localStorage.setItem('JWT', '')
        setAuth({
            isAuth: false
        })
    }

    return (
        <>
            <header className="header">
                <div className="container header__container">
                    <div className="header__logo">
                        <img src={LogoImg} alt="Логотип"/>
                        <span>Админ-панель</span>
                    </div>
                    <div className={classNames("header__links", {'active' : linksVisible})}>
                        <Link to="/">Главная</Link>
                        <Link to="/admin">Питомцы</Link>
                        <Link to="/admin/appeals">Обращения</Link>
                        <Link to="/admin" onClick={logout}>Выйти</Link>
                    </div>
                    <div className={classNames("header__toggle", {'active' : linksVisible})}
                         onClick={linksToggleHandler}>
                        <div className="header__toggle-line"></div>
                        <div className="header__toggle-line"></div>
                        <div className="header__toggle-line"></div>
                    </div>
                </div>
            </header>
            <main className="main">
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}

export default AdminLayout