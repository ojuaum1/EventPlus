import React from 'react';

import './Nav.css'

import logoMobile from '../../Assets/images/logo-white.svg'
import logodesk from '../../Assets/images/logo-pink.svg'

import { Link } from 'react-router-dom';

const Nav = ({ exibeNavbar, setExibeNavbar }) => {

    console.log(`EXIBE O MENU? ${exibeNavbar}`);
    return (
            <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
                <span onClick={() => { setExibeNavbar(false) }}
                    className='navbar__close'>x</span>

                <Link to="/" className='eventlogo'>
                    <img
                        className='eventlogo__logo-image'
                        src={window.innerWidth >= 992 ? logodesk : logoMobile}
                        alt='Event Plus Logo'
                    />
                </Link>

                <div className='navbar__items-box'>
                    <Link to="/" className='navbar__item'>Home</Link>
                    <Link className='navbar__item' to="/login">Login</Link>
                    <Link className='navbar__item' to="/eventos">Eventos</Link>
                    <Link className='navbar__item' to="/tipo-eventos">Tipos de Evento</Link>
                    <Link className='navbar__item' to="/testes">Teste</Link>
                </div>
            </nav>
    );
};

export default Nav;