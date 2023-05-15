import React from 'react';
import logo from "../images/header-logo.svg";
import {Link, Route, Routes} from 'react-router-dom';

function Header({onLogOut, userEmail}) {
    return (
        <header className="header">
            <div className="header__wrapper">
                <img
                    src={logo}
                    alt="Логотип"
                    className="header__logo"
                />
                <div className="header__menu">
                    <Routes>
                        <Route path="/sign-in"
                               element={<Link to='/sign-up' className='header__link'>Регистрация</Link>}/>
                        <Route path="/sign-up" element={<Link to='/sign-in' className='header__link'>Войти</Link>}/>
                        <Route path="/" element={
                            <div className='header__container'>
                                <span className='header__email'>{userEmail}</span>
                                <button className="header__login-out" onClick={onLogOut}>Выйти</button>
                            </div>}
                        />
                    </Routes>
                </div>
            </div>
        </header>
    )
}

export default Header;