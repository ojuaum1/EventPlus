import axios from "axios";

    export const myEventsResource = "/presencasEvento/ListarMinhas"
/**
 * Rota para o recurso Evento
 */
export const eventsResource = '/Evento';

export const commentaryEventResource = '/ComentarioEvento'

export const presencesEventResource = '/PresencasEvento';

export const loginResource = '/Login';
/**
 * Rota para o recurso Listar Próximos Eventos
 */
export const nextEventResource = '/Evento/ListarProximos';
/**
 * Rota para o recurso Tipos de Eventos
 */
export const eventsTypeResource = `/TiposEvento`

//const apiPort = '7118';
//const localApiUri = `https://localhost:${apiPort}/api`;
const externalApiUri =`https://eventwebapijoao.azurewebsites.net/api` ;

const api = axios.create({
    baseURL:externalApiUri
});

export default api;