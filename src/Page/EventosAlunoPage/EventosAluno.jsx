import React, { useContext, useEffect, useState } from "react";
import Header from "../../Componentes/Header/Header";
import MainContent from "../../Componentes/MainContent/MainContent";
import Title from "../../Componentes/Title/Title";
import Table from "../../Page/EventosAlunoPage/TableEvA/TableEvA";
import Container from "../../Componentes/Container/Container";
import { Select } from "../../Componentes/FormComponents/FormComponents";
import Spinner from "../../Componentes/Spinner/Spinner";
import Modal from "../../Componentes/Modal/Modal";
import api, { eventsResource, myEventsResource, presencesEventResource, commentaryEventResource } from "../../Services/Service";

import "./EventosAluno.css";
import { UserContext } from "../../Context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([


  ]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comentario, setComentario] = useState("");

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]);
  
  async function loadEventsType() {
    setShowSpinner(true)
    setEventos([]); // zera o array de eventos

    if (tipoEvento === "1") {//todos os eventos(Evento)

      try {
        const todosEventos = await api.get(eventsResource);
        const meusEventos = await api.get(`${myEventsResource}/${userData.userId}`);

        const eventosMarcados = verificaPresenca(todosEventos.data, meusEventos.data);
        setEventos(eventosMarcados);

        console.clear()
        console.log("Todos os eventos!!!");
        console.log(todosEventos.data);

        console.log("Eventos Marcados");
        console.log(eventosMarcados)
          ;
        console.log("Meus Eventos!!!");
        console.log(meusEventos.data);


      } catch (error) {
        console.log("erro na api")
        console.log("error")

      }

    } else if (tipoEvento === "2") {
      // listar meus eventos (presencaEvento)
      //retorna o formato diferente de array
      try {
        const retornoEventos = await api.get(`${myEventsResource}/${userData.userId}`);
        const arrEventos = [];
        retornoEventos.data.forEach((e) => {
          arrEventos.push({ ...e.evento, situacao: e.situacao, idPresencaEvento : e.idPresencaEvento, });

          console.log(arrEventos);
          setEventos(arrEventos);
        })
        console.log(retornoEventos.data);
      } catch (error) {
        console.log("erro na api")
        console.log("error")
      }
    }
    else {
      setEventos([]);
    }
    setShowSpinner(false);

  }

  const verificaPresenca = (arrAllEvents, eventsUser) => {

    for (let x = 0; x < arrAllEvents.length; x++) {//para cada evento}

      for (let i = 0; i < eventsUser.length; i++) {//procurar a correcao}

        if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) { 
        arrAllEvents[x].situacao = true;
        arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
        break; // para de procurar para evento principal atual
        }
      }
    }
    return arrAllEvents;
  }


  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

 const loadMyCommentary = async (IdUsuario, idEvento) => {
    const promise = await api.get(`${commentaryEventResource}?idUsuario=${IdUsuario} & idEvento=${idEvento}`);

    
    console.log(promise.data.descricao);

    setComentario(promise.data.descricao)
  }


  const showHideModal = (idEvent) => {
    setUserData ({...userData, idEvento : idEvent})
    setShowModal(showModal ? false : true);
  };

  const postMyComentary = async (idUsuario, idEvent, descricao, exibe) => {
    try {
      const response = await api.post(`${commentaryEventResource}`, {
        descricao: descricao,
        idUsuario: idUsuario,
        idEvento: idEvent,
        exibe: true
      });
  
      // Aqui você pode lidar com a resposta da API conforme necessário
      console.log('Resposta da API:', response.data);
    } catch (error) {
      // Lide com erros, se houver algum
      console.error('Erro na requisição:', error);
    }
  };
  
    

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    if (whatTheFunction === "connect") {

      try {//conectar
        const promise = await api.post(presencesEventResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId
        });

        if (promise.status === 201) {
          alert("presença confirmada, parabens");
        }

        loadEventsType();

      } catch (error) {
        alert("opa deu erro amigao")
      }
      return;
    }
/*     console.clear();
    console.log(`
Desconectar
${whatTheFunction}
${presencaId}
`); */

    //unconnect
    try {
      const unconnected = await api.delete(
        `${presencesEventResource}/${presencaId}`
      );
      if (unconnected.status === 204) {
        alert("desconectado do Evento");
        loadEventsType();
        

      }
    } catch (error) {
      console.log("erro ao desconectar o usuario");
      console.log("erro");
alert("erro amigo")
    }
     alert("DESCONECTAR DO EVENTO:" + eventId);
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          // userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyCommentary}
          fnPost={postMyComentary}
          fnDelete={commentaryRemove}
          comentaryText={comentario}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
