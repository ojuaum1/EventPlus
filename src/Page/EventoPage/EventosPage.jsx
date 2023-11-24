// Importação de bibliotecas e componentes do React e do projeto
import React, { useEffect, useState } from 'react';
import './EventosPage.css'
import Title from '../../Componentes/Title/Title'
import MainContent from '../../Componentes/MainContent/MainContent';
import Container from '../../Componentes/Container/Container';
import ImageIlustrator from '../../Componentes/ImageIllustrator/ImageIllustrator'
import eventoImage from '../../Assets/images/evento.svg'
import { Input, Button, Select } from '../../Componentes/FormComponents/FormComponents'
import api, { eventsResource, eventsTypeResource } from '../../Services/Service';
import TableEvent from './TableEv/TableEv';
import Notification from '../../Componentes/Notification/Notification'
import Spinner from "../../Componentes/Spinner/Spinner"

// Definição do componente principal, EventosPage
const EventosPage = () => {
    // STATES - Estados do componente
    const [frmEdit, setFrmEdit] = useState(false); // Indica se o formulário está em modo de edição

    const IdInstituicao = "95A14FC6-240A-470E-9C8D-F6863772D99B"

    // Estados para armazenar dados do evento
    const [nomeEvento, setNomeEvento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idTipoEvento, setIdTipoEvento] = useState('');
    const [idEvento, setIdEvento] = useState(null);
    const [dataEvento, setDataEvento] = useState('');

    // Estados para armazenar tipos de eventos e eventos
    const [tiposEvento, setTipoEventos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState([]) // Estado para exibir notificações
    const [showSpinner, setShowSpinner] = useState(false) // Estado para exibir spinner de carregamento

    // FUNÇÕES - Funções auxiliares do componente

    // Função assíncrona para carregar os tipos de eventos da API
    async function loadEventsType() {
        try {
            const retorno = await api.get(eventsTypeResource);
            setTipoEventos(retorno.data)
        } catch (error) {
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operação. Verifique sua conexão com a internet',
                imgIcon: 'danger',
                imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
    }

    // Função assíncrona para carregar os eventos da API
    async function loadEvents() {
        try {
            const retorno = await api.get(eventsResource);
            setEventos(retorno.data)
        } catch (error) {
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operação. Verifique sua conexão com a internet',
                imgIcon: 'danger',
                imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
    }

    // Efeito que é executado ao montar o componente, carregando os tipos de eventos e eventos
    useEffect(() => {
        loadEventsType()
        loadEvents()
    }, [])

    // Função para exibir uma notificação de sucesso
    function theMagic(textNote) {
        setNotifyUser({
            titleNote: 'Sucesso',
            textNote,
            imgIcon: 'Success',
            imgAlt: 'Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.',
            showMessage: true
        })
    }

    // Função para lidar com o envio do formulário de cadastro ou edição de evento
    async function handleSubmit(e) {
        e.preventDefault();
        if (nomeEvento.trim().length < 3) {
            setNotifyUser({
                titleNote: 'Aviso',
                textNote: 'O título deve conter pelo menos 3 caracteres',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                showMessage: true
            })
            return;
        }

        try {
            // Requisição para cadastrar um novo evento
            await api.post(eventsResource, {
                dataEvento: dataEvento,
                nomeEvento: nomeEvento,
                descricao: descricao,
                idTipoEvento: idTipoEvento,
                idInstituicao: IdInstituicao
            })
            theMagic("Cadastrado com sucesso")
            loadEvents() // Recarrega a lista de eventos após o cadastro

        } catch (error) {
            // Exibe uma notificação de erro em caso de falha na operação
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operação. Verifique sua conexão com a internet',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
    }

    // Função para lidar com o envio do formulário de atualização de evento
    async function handleUpdate(e) {
        e.preventDefault();
        if (nomeEvento.trim().length < 3) {
            setNotifyUser({
                titleNote: 'Aviso',
                textNote: 'O título deve conter pelo menos 3 caracteres',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
        try {
            // Requisição para atualizar um evento existente
            const promise = await api.put(`${eventsResource}/${idEvento}`, {
                dataEvento: dataEvento,
                nomeEvento: nomeEvento,
                descricao: descricao,
                idTipoEvento: idTipoEvento,
                idInstituicao: IdInstituicao
            })

            if (promise.status == 204) {
                setFrmEdit(false)
                setDataEvento('')
                setNomeEvento('')
                setDescricao('')
                setIdTipoEvento('')
                theMagic("Atualizado com sucesso")
                loadEvents() // Recarrega a lista de eventos após a atualização
            }
        } catch (error) {
            // Exibe uma notificação de erro em caso de falha na operação
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operação. Verifique sua conexão com a internet',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
    }

    // Função para cancelar a edição do formulário
    function editActionAbort() {
        setFrmEdit(false)
        setDataEvento('')
        setNomeEvento('')
        setDescricao('')
        setIdTipoEvento('')
    }

    // Função para exibir o formulário de atualização com os dados do evento selecionado
    async function showUpdateForm(idElement) {
        setFrmEdit(true)
        try {
            const promise = await api.get(`${eventsResource}/${idElement}`, { idElement })
            setDataEvento(promise.data.dataEvento.slice(0, 10))
            setNomeEvento(promise.data.nomeEvento)
            setDescricao(promise.data.descricao)
            setIdTipoEvento(promise.data.idTipoEvento)
            setIdEvento(idElement);
            console.log(promise);

        } catch (error) {
            // Exibe uma notificação de erro em caso de falha na operação
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operação. Verifique sua conexão com a internet',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
    }

    // Função para lidar com a exclusão de um evento
    async function handleDelete(idElement) {
        if (window.confirm('Confirma a exclusão')) {
            try {
                // Requisição para excluir um evento
                const promise = await api.delete(`${eventsResource}/${idElement}`, { idElement })
                if (promise.status == 204) {
                    theMagic("Excluído com sucesso")
                    const buscaEventos = await api.get(eventsResource);
                    setEventos(buscaEventos.data)
                }
            } catch (error) {
                // Exibe uma notificação de erro em caso de falha na operação
                setNotifyUser({
                    titleNote: 'Erro',
                    textNote: 'Erro na operação. Verifique sua conexão com a internet',
                    imgIcon: 'warning',
                    imgAlt: 'Imagem de ilustração de erro. Rapaz segurando letra x.',
                    showMessage: true
                })
            }
        }
    }

    // Função para formatar os tipos de eventos em um formato compatível com o componente Select
    function tituloTipo(tipoEventos) {
        let arrayOptions = []

        tipoEventos.forEach(element => {
            arrayOptions.push({ value: element.idTipoEvento, text: element.titulo })
        })
        return arrayOptions
    }

    // RENDERIZAÇÃO - Estrutura de retorno do componente
    return (
        <>
            {<Notification{...notifyUser} setNotifyUser={setNotifyUser} />} {/* Renderiza o componente de notificação */}
            <MainContent>
                {/* Seção para cadastro de evento */}
                <section className="cadastro-evento-section">
                    <Title titleText="Cadastro de Evento" />
                    <Container>
                        <div className="cadastro-evento__box">

                            {/* Renderiza a imagem ilustrativa do evento */}
                            <ImageIlustrator imageRender={eventoImage} />

                            {/* Formulário para cadastro ou edição de evento */}
                            <form className='ftipo-evento' onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                                {
                                    !frmEdit ?
                                        (
                                            // Se não estiver em modo de edição, renderiza os campos do formulário de cadastro
                                            <>
                                                <Input
                                                    id='Nome'
                                                    type={'text'}
                                                    placeholder={'Nome'}
                                                    name={'nome'}
                                                    required={'required'}
                                                    value={nomeEvento}
                                                    manipulationFunction={(e) => {
                                                        setNomeEvento(e.target.value)
                                                    }}
                                                />

                                                <Input
                                                    id='Descricao'
                                                    type={'text'}
                                                    placeholder={'Descrição'}
                                                    name={'descricao'}
                                                    required={'required'}
                                                    value={descricao}
                                                    manipulationFunction={(e) => {
                                                        setDescricao(e.target.value)
                                                    }}
                                                />

                                                <Select
                                                    id='TiposEvento'
                                                    name={'tiposEvento'}
                                                    required={'required'}
                                                    options={tiposEvento}
                                                    value={idTipoEvento}
                                                    manipulationFunction={(e) => {
                                                        setIdTipoEvento(e.target.value)
                                                    }}
                                                />

                                                <Input
                                                    id='dataEvento'
                                                    type={'date'}
                                                    placeholder={'dd/mm/aaaa'}
                                                    name={'Data'}
                                                    required={'required'}
                                                    value={dataEvento}
                                                    manipulationFunction={(e) => {
                                                        setDataEvento(e.target.value)
                                                    }}
                                                />

                                                <Button
                                                    textButton="Cadastrar"
                                                    id="cadastrar"
                                                    name="cadastrar"
                                                    // O formulário só será submetido porque o type é submit
                                                    type="submit"
                                                />
                                            </>
                                        ) :
                                        // Se estiver em modo de edição, renderiza os campos do formulário de edição
                                        <>
                                            <Input
                                                id='Nome'
                                                type={'text'}
                                                placeholder={'Nome'}
                                                name={'nome'}
                                                required={'required'}
                                                value={nomeEvento}
                                                manipulationFunction={(e) => {
                                                    setNomeEvento(e.target.value)
                                                }}
                                            />

                                            <Input
                                                id='Descricao'
                                                type={'text'}
                                                placeholder={'Descrição'}
                                                name={'descricao'}
                                                required={'required'}
                                                value={descricao}
                                                manipulationFunction={(e) => {
                                                    setDescricao(e.target.value)
                                                }}
                                            />

                                            <Select
                                                id='TiposEvento'
                                                name={'tiposEvento'}
                                                required={'required'}
                                                options={tiposEvento}
                                                value={idTipoEvento}
                                                manipulationFunction={(e) => {
                                                    setIdTipoEvento(e.target.value)
                                                }}
                                            />

                                            <Input
                                                id='dataEvento'
                                                type={'date'}
                                                placeholder={'dd/mm/aaaa'}
                                                name={'Data'}
                                                required={'required'}
                                                value={dataEvento}
                                                manipulationFunction={(e) => {
                                                    setDataEvento(e.target.value)
                                                }}
                                            />

                                            {/* Botões para atualizar e cancelar a edição */}
                                            <div className="buttons-editbox">
                                                <Button
                                                    textButton="Atualizar"
                                                    id="atualizar"
                                                    name="atualizar"
                                                    // O formulário só será submetido porque o type é submit
                                                    type="submit"
                                                    addtionalClass="button-component--middle"
                                                />

                                                <Button
                                                    textButton="Cancelar"
                                                    id="cancelar"
                                                    name="cancelar"
                                                    // O formulário só será submetido porque o type é submit
                                                    type="submit"
                                                    manipulationFunction={editActionAbort}
                                                    addtionalClass="button-component--middle"
                                                />
                                            </div>

                                        </>
                                }

                            </form>
                        </div>

                    </Container>
                </section>

                {/* Seção para listar eventos */}
                <section className='lista-eventos-section'>
                    <Container>
                        <Title titleText={"Lista Tipo de Eventos"} color="white"></Title>
                        {/* Componente de tabela para exibir a lista de eventos */}
                        <TableEvent
                            dados={eventos}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default EventosPage;
