import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";


import TiposEvento from "../Page/TiposEventosPage/TiposEvento";
import EventoPage from "../Page/EventoPage/EventoPage";
import HomePage from "../Page/HomePage/HomePage";
import LoginPage from "../Page/Login/Login";
import Teste from "../Page/Teste/Teste";
import Header from "../Componentes/Header/Header";

const Rotas = () => {
  return (
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<HomePage />} path={"/"} exact />
          <Route element={<LoginPage />} path={"/login"} />
          <Route element={<EventoPage />} path={"/eventos"} />
          <Route element={<TiposEvento />} path={"/tipo-eventos"} />
          <Route element={<Teste/>} path={"/testes"} />
        </Routes>
      </BrowserRouter>

  );
};

export default Rotas;

