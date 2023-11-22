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

    // Variáveis de estado
    const [frmEdit, setFrmEdit] = useState(false); // Está em modo de edição?
    const [titulo, setTitulo] = useState()
    const [TiposEvento, setTipoEventos] = useState([]); // Lista de tipos de evento
    const [notifyUser, setNotifyUser] = useState("") // Mensagem de notificação
    const [idEvento, setIdEvento] = useState(null); // ID para edição
    const [showSpinner, setShowSpinner] = useState(false) // Mostra o spinner durante o carregamento

    // useEffect para carregar os tipos de evento quando o componente é montado
    useEffect(() => {
        async function loadEventsType() {
            setShowSpinner(true)
            try {
                const retorno = await api.get(eventsTypeResouce);
                setTipoEventos(retorno.data)
            } catch (error) {
                // Notificar o usuário em caso de erro
                setNotifyUser({
                    titleNote: "danger",
                    textNote: `Erro ao recarregar`,
                    imgIcon: "danger",
                    imgAlt: "Ilustração de imagem de falha. Pessoa segurando um balão com um símbolo de X",
                    showMessage: true,
                })
            }
            setShowSpinner(false);
        }
        loadEventsType();
    }, []); // Array de dependência vazio garante que esse efeito seja executado apenas uma vez no momento da montagem.

    // Lidar com a submissão do formulário para adicionar um novo tipo de evento
    async function handleSubmit(e) {
        e.preventDefault() // Impede a submissão do formulário
        if (titulo.trim().length < 3) {
            // Notificar o usuário se o título for muito curto
            setNotifyUser({
                titleNote: "aviso",
                textNote: `O título deve ter pelo menos 3 caracteres`,
                imgIcon: "warning",
                imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de aviso",
                showMessage: true,
            })
            return;
        }

        try {
            // Fazer uma solicitação à API para adicionar um novo tipo de evento
            const retorno = await api.post(eventsTypeResouce, {
                titulo: titulo
            });

            // Atualizar a lista de tipos de eventos
            const buscarEventos = await api.get(eventsTypeResouce);
            setTipoEventos(buscarEventos.data);

            // Limpar a entrada do formulário
            setTitulo("");
            
            // Notificar o usuário do sucesso na criação do evento
            setNotifyUser({
                titleNote: "sucesso",
                textNote: `Evento cadastrado com sucesso`,
                imgIcon: "success",
                imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de marca de seleção",
                showMessage: true,
            })

        } catch (error) {
            // Notificar o usuário em caso de erro durante a solicitação à API
            setNotifyUser({
                titleNote: "erro",
                textNote: `Erro na operação`,
                imgIcon: "danger",
                imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de X",
                showMessage: true,
            })
        }
    };

    // Lidar com a submissão do formulário para atualizar um tipo de evento existente
    async function handleUpdate(e) {
        setShowSpinner(true); // Mostra o spinner durante o processo de atualização
        try {
            e.preventDefault(); // Impede a submissão do formulário
            // Fazer uma solicitação à API para atualizar o tipo de evento
            const retorno = await api.put(eventsTypeResouce + "/" + idEvento, { "titulo": titulo });

            if (retorno.status === 204) {
                // Notificar o usuário da atualização bem-sucedida
                setNotifyUser({
                    titleNote: "sucesso",
                    textNote: `Cadastro atualizado`,
                    imgIcon: "success",
                    imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de marca de seleção",
                    showMessage: true,
                })

                // Atualizar os dados na tela
                const retorno = await api.get(eventsTypeResouce);
                setTipoEventos(retorno.data)

                // Voltar para a tela de cadastro
                editActionAbort();
            }

        } catch (error) {
            // Notificar o usuário de um erro durante o processo de atualização
            setNotifyUser({
                titleNote: "Erro",
                textNote: `Erro na operação`,
                imgIcon: "danger",
                imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de X",
                showMessage: true,
            })
        }
        setShowSpinner(false); // Oculta o spinner após o processo de atualização
    }

    // Função para cancelar a ação de edição
    function editActionAbort() {
        setFrmEdit(false)
        setTitulo("");
        setIdEvento(null); // Reseta as variáveis
    }

    // Função para mostrar o formulário de atualização para editar um tipo de evento existente
    async function showUpdateForm(idElement) {
        setShowSpinner(true)

        setFrmEdit(true)
        setIdEvento(idElement);
        try {
            // Fazer uma solicitação à API para obter os detalhes do tipo de evento
            const retorno = await api.get(`${eventsTypeResouce}/${idElement}`);
            setTitulo(retorno.data.titulo);
        } catch (error) {
            // Notificar o usuário da exclusão bem-sucedida do evento
            setNotifyUser({
                titleNote: "sucesso",
                textNote: `Evento excluído com sucesso`,
                imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de marca de seleção",
                showMessage: true,
            })
        }
        setShowSpinner(false)
    }

    // Função para lidar com a exclusão de um tipo de evento
    async function handleDelete(idElement) {
        if (!window.confirm("Confirma a exclusão")) {
            // Se o usuário cancelar a exclusão, não faça nada
            return;
        }
        try {
            // Fazer uma solicitação à API para excluir o tipo de evento
            const retorno = await api.delete(`${eventsTypeResouce}/${idElement}`);
            console.log(retorno)

            // Limpar a lista de tipos de evento
            setTipoEventos([]);

            // Atualizar a lista de tipos de evento
            const buscarEventos = await api.get(eventsTypeResouce);
            setTipoEventos(buscarEventos.data);

            // Notificar o usuário da exclusão bem-sucedida do evento
            setNotifyUser({
                titleNote: "sucesso",
                textNote: `Evento excluído com sucesso`,
                imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de marca de seleção",
                showMessage: true,
            })
        } catch (error) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: `Evento excluído com sucesso`,
                imgAlt: "Ilustração de imagem de sucesso. Pessoa segurando um balão com um símbolo de marca de seleção",
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
                    {/* título */}
                    <Title titleText={"Cadastro tipo de eventos "} />
                    <Container>
                        <div className='cadastro-evento__box'>

                            {/* imagem de ilustração */}
                            <ImageIlustrator
                                imageRender={tipoEventoImage}
                            />
                            {/* componente de formulário*/}
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
