import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../Componentes/ImageIllustrator/ImageIllustrator";
import logo from "../../Assets/images/logo-pink.svg";
import loginImg from "../../Assets/images/login.svg";
import { Input, Button } from "../../Componentes/FormComponents/FormComponents";
import api, { loginResource } from "../../Services/Service";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../Context/AuthContext";

const LoginPage = () => {
  // Estado local para armazenar dados do usuário
  const [user, setUser] = useState({ email: "Joao.goxtoso@gmail.com", senha: "" });

  // Importa o contexto do usuário para autenticação
  const { userData, setUserData } = useContext(UserContext);

  // Utiliza o hook de navegação do react-router-dom
  const navigate = useNavigate();

  useEffect(() => {
    if(userData.nome) navigate("/")
}, [userData]);

  // Função para lidar com o envio do formulário de login
  async function handleSubmit(e) {
    e.preventDefault();

    // Verifica se os campos de e-mail e senha têm pelo menos 3 caracteres
    if (user.email.length >= 3 && user.senha.length >= 3) {
      try {
        // Faz uma requisição à API para autenticação
        const promise = await api.post(loginResource, {
          email: user.email,
          senha: user.senha
        });

        // Decodifica o token retornado pela API
        const userFullToken = userDecodeToken(promise.data.token);

        // Atualiza o contexto do usuário com os dados decodificados
        setUserData(userFullToken);

        // Armazena o token no localStorage para persistência da sessão
        localStorage.setItem("token", JSON.stringify(userFullToken));

        // Redireciona para a página principal
        navigate("/");
      } catch (error) {
        // Trata erros da API: bad request (401) ou erro de conexão
        alert("Verifique os dados e a conexão");
        console.log(error);
      }
    } else {
      // Alerta se os campos não estiverem preenchidos corretamente
      alert("Preencha os campos corretamente");
    }

    // Exibe os dados de login no console (pode ser removido em produção)
    console.log("Dados de login:");
    console.log(user);
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          {/* Componente personalizado para renderizar a ilustração */}
          <ImageIllustrator
            imageRender={loginImg}
            altText="Imagem de um homem em frente a uma porta de entrada"
            additionalClass="login-illustrator"
          />
        </div>

        <div className="frm-login">
          {/* Logotipo da aplicação */}
          <img src={logo} className="frm-login__logo" alt="" />

          {/* Formulário de login */}
          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            {/* Campo de entrada para o e-mail */}
            <Input
              additionalclass="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({ ...user, email: e.target.value.trim() });
              }}
              placeholder="Nome de usuário"
            />
            {/* Campo de entrada para a senha */}
            <Input
              additionalclass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({ ...user, senha: e.target.value.trim() });
              }}
              placeholder="****"
            />

            {/* Link para recuperação de senha */}
            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            {/* Botão de envio do formulário */}
            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              additionalclass="frm-login__button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
