import React, { useEffect, useState } from 'react';
import Title from "../../Componentes/Title/Title"
import tipoEventoImage from "../../Assets/images/tipo-evento.svg"
import Container from '../../Componentes/Container/Container';
import MainContent from "../../Componentes/MainContent/MainContent"
import ImageIlustrator from '../../Componentes/ImageIllustrator/ImageIllustrator';
import "./TiposEvento.css"
import { Button, Input } from '../../Componentes/FormComponents/FormComponents';
import Notification from "../../Componentes/Notification/Notification"
//api
import api, { eventsTypeResouce } from "../../Services/Service"
import TableTp from './TableTp/TableTp';
import Spinner from "../../Componentes/Spinner/Spinner"


const TiposEvento = () => {

    const [frmEdit, setFrmEdit] = useState(false); //esta em modo de edicao ?
    const [titulo, setTitulo] = useState()
    const [TiposEvento, setTipoEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState("")
    const [idEvento, setIdEvento] = useState(null);// para editar, por causa do evento
    const [showSpinner, setShowSpinner] = useState(false)

    useEffect(() => {
        async function loadEventsType() {
            setShowSpinner(true)
            try {
                const retorno = await api.get(eventsTypeResouce);
                setTipoEventos(retorno.data)
            } catch (error) {
                setNotifyUser({
                    titleNote: "danger",
                    textNote: `deu erro ao recarregar`,
                    imgIcon: "danger",
                    imgAlt: "imagem de ilustraçao de sucesso. moça segurando um balao com simbolo de x",
                    showMessage: true,
                })

            }
            setShowSpinner(false);
        }
        loadEventsType();
    }, []);


    // aqui é quando clico no botao cadastrar 
    async function handleSubmit(e) {
        e.preventDefault()//evita o submit do formulario
        if (titulo.trim().length < 3) {

            setNotifyUser({
                titleNote: "aviso",
                textNote: `o titulo deve conter pelo menos 3 caracteres`,
                imgIcon: "warning",
                imgAlt: "imagem de ilustraçao de sucesso. moça segurando um balao com simbolo de x",
                showMessage: true,
            })
            return;
        }

        try {
            const retorno = await api.post(eventsTypeResouce, {
                titulo: titulo
            });

            //atualiza a lista de eventos cadastrados
            const buscarEventos = await api.get(eventsTypeResouce);
            setTipoEventos(buscarEventos.data);//aqui retornar um array com o item cadastrado

            setTitulo("");
            setNotifyUser({
                titleNote: "sucesso",
                textNote: `evento cadastrado com sucesso`,
                imgIcon: "success",
                imgAlt: "imagem de ilustraçao de sucesso. rapaz segurando um balão com x",
                showMessage: true,
            })

        } catch (error) {
            setNotifyUser({
                titleNote: "erro",
                textNote: `o titulo deve conter pelo menos 3 caracteres`,
                imgIcon: "danger",
                imgAlt: "imagem de ilustraçao de sucesso. rapaz segurando um balão com x",
                showMessage: true,
            })
        }


    };
    function theMagic() {
        setNotifyUser({
            titleNote: "sucesso",
            textNote: `evento excluido com sucesso`,
            imgAlt: "image de ilustracao de sucesso, moca segurando um balao com simbolo de confirmacao ok ",
            showMessage: true,
        })
    }

    async function handleUpdate(e) {
        setShowSpinner(true);
        try {
            e.preventDefault();
            const retorno = await api.put(eventsTypeResouce + "/" + idEvento, { "titulo": titulo }); //o id esta no state


            if (retorno.status === 204) {
                //notificar o usuario 
                setNotifyUser({
                    titleNote: "sucesso",
                    textNote: `cadastro atualizado`,
                    imgIcon: "success",
                    imgAlt: "image de ilustracao de sucesso, moca segurando um balao com simbolo de confirmacao ok ",
                    showMessage: true,
                })
                //atualizar os dados na tela 
                const retorno = await api.get(eventsTypeResouce);
                setTipoEventos(retorno.data)

                //volta para tela de cadastro
                editActionAbort();

            }

        } catch (error) {
            //notificar o erro ao usuario
            setNotifyUser({
                titleNote: "Erro",
                textNote: `Erro na operacao`,
                imgIcon: "danger",
                imgAlt: "image de ilustracao de sucesso, moca segurando um balao com simbolo de confirmacao ok ",
                showMessage: true,
            })
        }
        setShowSpinner(false);
    }

    function editActionAbort() {
        setFrmEdit(false)
        setTitulo("");
        setIdEvento(null);//reseta as variaveis
    }

    async function showUpdateForm(idElement) {
        setShowSpinner(true)

        setFrmEdit(true)
        setIdEvento(idElement);
        try {
            const retorno = await api.get(`${eventsTypeResouce}/${idElement}`);
            setTitulo(retorno.data.titulo);
        } catch (error) {
            
            setNotifyUser({
                titleNote: "sucesso",
                textNote: `evento excluido com sucesso`,
                imgAlt: "image de ilustracao de sucesso, moca segurando um balao com simbolo de confirmacao ok ",
                showMessage: true,
            })
        }
        setShowSpinner(false)
    }

    async function handleDelete(idElement) {
        if (!window.confirm("confirma a exclusao")) {

        }
        try {
            const retorno = await api.delete(`${eventsTypeResouce}/${idElement}`);
            console.log(retorno)

            setTipoEventos([]);

            const buscarEventos = await api.get(eventsTypeResouce);
            setTipoEventos(buscarEventos.data);//aqui retornar um array com o item cadastrado
            setNotifyUser({
                titleNote: "sucesso",
                textNote: `evento excluido com sucesso`,
                imgAlt: "image de ilustracao de sucesso, moca segurando um balao com simbolo de confirmacao ok ",
                showMessage: true,
            })
        } catch (error) {
            setNotifyUser({
                titleNote: "Warning",
                textNote: `evento excluido com sucesso`,
                imgAlt: "image de ilustracao de sucesso, moca segurando um balao com simbolo de confirmacao ok ",
                showMessage: true,
            })
        }


    }


    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

            {showSpinner ? <Spinner /> : null}

            <MainContent>
                <section className='cadastro-evento-section'>
                    {/* titulo */}
                    <Title titleText={"Cadastro tipo de eventos "} />
                    <Container>
                        <div className='cadastro-evento__box'>


                            {/* imagem de ilustraçao */}
                            <ImageIlustrator
                                imageRender={tipoEventoImage}
                            />
                            {/* componente de formulario*/}
                            <form
                                className='ftipo-evento'
                                onSubmit={frmEdit ? handleUpdate : handleSubmit}
                            >
                                {/* {cadastrar ou editar} */}
                                {
                                    !frmEdit ? (
                                        <>
                                            <Input
                                                id="Titulo"
                                                placeholder="Título"
                                                name={"titulo"}
                                                type={"text"}
                                                required={"required"}
                                                value={titulo}
                                                manipulationFunction={(e) => { setTitulo(e.target.value); }}
                                            />

                                            <Button textButton="Cadastrar" id="cadastrar" name="cadastrar" type="submit" />
                                            <Button textButton="Magica" id="cadastrar" name="cadastrar" type="button" manipulationFunction={theMagic} />
                                        </>
                                    ) : (

                                        <>
                                            <Input

                                                id="Titulo"
                                                placeholder="Título"
                                                name={"titulo"}
                                                type={"text"}
                                                required={"required"}
                                                value={titulo}
                                                manipulationFunction={(e) => {
                                                    setTitulo(e.target.value);
                                                }}

                                            />
                                            <div className='buttons-editbox'>
                                                <Button
                                                    textButton="Atualizar"
                                                    id="atualizar"
                                                    name="atualizar"
                                                    type="submit"
                                                    additinalClass='button-component--middle'
                                                />

                                                <Button

                                                    textButton="Cancelar"
                                                    id="cancelar"
                                                    name="cancelar"
                                                    type="button"
                                                    manipulationFunction={editActionAbort}
                                                    additinalClass='button-component--middle'
                                                />
                                            </div>


                                        </>

                                    )
                                }
                            </form>

                        </div>
                    </Container>
                </section>

                <section className='lista-eventos-section'>
                    <Container>
                        <Title titleText={"Lista Tipo de Eventos"} color='white' />
                        <TableTp
                            dados={TiposEvento}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );

}

export default TiposEvento;