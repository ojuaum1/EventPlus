import React, { useState } from 'react';
import './Header.css'

import Nav from '../Nav/Nav'

import Container from '../Container/Container';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario';
import menubar from '../../Assets/images/menubar.png'

const Header = () => {
    const [exibeNavbar,setExibeNavbar] = useState(false); // exibe/esconde menu
    return (
        <header className='headerpage'>
            <Container>
                <div className='header-flex'>
                    <img
                        src={menubar}
                        alt="Imagem menu de barras serve para exibir ou esconder o menu do smartphone "
                    onClick={()=>{setExibeNavbar(true)}}
                    className='headerpage__menubar'
                    />
                    <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar}/>
                    <PerfilUsuario />
                </div>
            </Container>
        </header>
    );
};

export default Header;