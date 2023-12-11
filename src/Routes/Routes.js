import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //v6

// imports dos componentes de página
import HomePage from "../Page/HomePage/HomePage";
import TipoEventos from "../Page/TiposEventosPage/TiposEvento";
import EventosPage from "../Page/EventoPage/EventosPage";
import LoginPage from "../Page/Login/LoginPage";
import TestePage from "../Page/Teste/Teste";
import EventosAlunoPage from "../../src/Page/EventosAlunoPage/EventosAluno"
import Header from "../Componentes/Header/Header";
import Footer from "../Componentes/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";

// Componente Rota
const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route element={<HomePage />} path="/" exact />

        <Route
          path="/tipo-eventos"
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventos />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventos"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventos-Aluno"
          element={
            <PrivateRoute redirectTo="/">
              <EventosAlunoPage />
            </PrivateRoute>
          }
        />

        <Route element={<LoginPage />} path="/login" />
        <Route element={<TestePage />} path="/testes" />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;