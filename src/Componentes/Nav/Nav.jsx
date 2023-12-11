import React, { useContext } from 'react';
import '../Nav/Nav.css';

//import imagens
import logoMobile from '../../Assets/images/logo-white.svg';
import logoDesktop from '../../Assets/images/logo-pink.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/AuthContext';

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
    const {userData} = useContext(UserContext);

    //console.log(`exibe o menu? ${exibeNavbar}`);

    return (

        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span
                onClick={() => { setExibeNavbar(false) }}
                className='navbar__close'
            >
                X
            </span>

            <Link to="/" className='eventlogo'>
                <img
                    className='eventlogo__logo-image'
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                    alt="Event plus Logo"
                />
            </Link>

                       <div className="navbar__items-box">
                <Link to="/" className='navbar__item'>Home</Link>
                
                {userData.nome && userData.role === "adm" ? (
                <>
                    <Link  className='navbar__item' to="/tipo-eventos">Tipos de Evento</Link>
                    <Link  className='navbar__item' to="/eventos">Eventos</Link>
                </>
                ) : (
                    userData.nome && userData.role === "Cliente" ? (
                        <Link  className='navbar__item' to="/eventos-Aluno">Eventos Aluno</Link>
                    ):(
                        null
                    )
                )}
                
                {/* <Link  className='navbar__item' to="/login">Login</Link> */}
                {/* <Link  className='navbar__item' to="/testes">Testes</Link> */}
            </div>

        </nav>

    );
};

export default Nav;