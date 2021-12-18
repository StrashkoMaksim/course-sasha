import React, {useState} from 'react';
import LogoImg from "../assets/img/logo.jpg"
import {Link} from "react-router-dom";
import classNames from "classnames";

const MainLayout = ({ children }) => {
    const [linksVisible, setLinksVisible] = useState(false)

    const linksToggleHandler = () => {
        setLinksVisible(!linksVisible)
    }

    return (
        <>
            <header className="header">
                <div className="container header__container">
                    <Link to="/" className="header__logo">
                        <img src={LogoImg} alt="Логотип"/>
                        <span>Теремок</span>
                    </Link>
                    <div className={classNames("header__links", {'active' : linksVisible})}>
                        <Link to="/pets">Наши питомцы</Link>
                        <Link to="/contacts">Связаться с нами</Link>
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
    );
};

export default MainLayout;