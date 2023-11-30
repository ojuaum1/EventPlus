import React, { useContext } from "react";
import iconeLogout from "../../Assets/images/icone-logout.svg";

import "./PerfilUsuario.css";

import { UserContext } from "../../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const PerfilUsuario = () => {
  // Obtém dados do usuário e função para atualizar o contexto de usuário
  const { userData, setUserData } = useContext(UserContext);

  // Utiliza o hook de navegação do react-router-dom
  const navigate = useNavigate();

  // Função para realizar o logout do usuário
  const logout = () => {
    // Limpa o localStorage para remover o token de autenticação
    localStorage.clear();

    // Limpa os dados do usuário no contexto
    setUserData({});

    // Redireciona o usuário para a página de login
    navigate("/");
  }

  return (
    <div className="perfil-usuario">
      {userData.nome ? (
        /* Exibe o nome do usuário como item de menu */
        <>
          < span className="perfil-usuario__menuitem">{userData.nome}</span>
          <img
            onClick={logout}
            title="Deslogar"
            className="perfil-usuario__icon"
            src={iconeLogout}
            alt="imagem ilustrativa"
          />
        </>
      ) : (

        <Link to="/login" className="perfil-usuario__menuitem">
          Login
        </Link>
      )}
   </div >
  );
};

export default PerfilUsuario;
