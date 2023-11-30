import { useEffect, useState } from 'react';
import './App.css';
import { UserContext } from './Context/AuthContext';
import Rotas from './Routes/Routes';
//importa nosso app encapsulado pelo sistema de roteamento
const App = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const token = localStorage.getItem("token")
        setUserData(token === null ? {} : JSON.parse(token))
    }, []);
    return (
        <UserContext.Provider value={ { userData, setUserData } }>
            <Rotas />
        </UserContext.Provider>
    );
};


export default App;
