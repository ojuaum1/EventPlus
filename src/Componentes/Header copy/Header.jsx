import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to ="/">Home</Link>
                <br/>
                <Link to ="/Evento">Evento</Link>
                <br/>               
                <Link to ="/Login">Login</Link>
                <br/>             
               <Link to ="/TipoEvento">TipoEvento</Link>
                <br/>
                <Link to ="/Teste">teste</Link>
               
            </nav>
        </header>
    );
};

export default Header;