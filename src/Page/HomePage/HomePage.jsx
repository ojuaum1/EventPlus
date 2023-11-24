import React, { useEffect, useState } from 'react';
import Banner from '../../Componentes/Banner/Banner';
import './HomePage.css'
import Notification from '../../Componentes/Notification/Notification';
import Container from "../../Componentes/Container/Container"
import Title from '../../Componentes/Title/Title'
import MainContent from '../../Componentes/MainContent/MainContent';
import VisionSection from '../../Componentes/VisionSection/VisionSection';
import NextEvent from '../../Componentes/NextEvent/NextEvent';
import api from '../../Services/Service';
import {nextEventResource} from '../../Services/Service'


const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState("")

  useEffect(() => {
    async function getNextEvents() {
      try {
        // const promisse = await api.get("/Evento/ListarProximos");
        const promisse = await api.get(`${nextEventResource}`);
        const dados = await promisse.data
        console.log(dados);

        setNextEvents(dados);//atualiza o state
      } catch (error) {
        setNotifyUser({
          titleNote:"erro",
          textNote: `o titulo deve conter pelo menos 3 caracteres`,
          imgIcon: "sucess",
          imgAlt:  "imagem de ilustraçao de erro. rapaz segurando balao com simbolo de x",
          showMessage:true,
      })
      }
    }
    getNextEvents()//roda a função
  }, []);
  return (

    <MainContent>
      <Banner />

      <section className='proximos-eventos'>
        <Container>
          <Title titleText={'proximos-eventos'} />

          <div className='events-box'>
            {
              nextEvents.map((e) => {
                return (
                  <NextEvent
                    key={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    idEvent={e.idEvento}
                  />
                );
              })
            }
          </div>
        </Container>
      </section>

      <VisionSection />

    </MainContent >

  );
};

export default HomePage;