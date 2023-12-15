import axios from "axios";

   
/**
 * Rota para o recurso Evento
 */
export const eventsResource = '/Evento';


export const oldEventResource = '/Evento/ListarAntigos'


export const commentaryEventResource = '/ComentarioEvento'


 export const myEventsResource = "/presencasEvento/ListarMinhas"

 // Rota para Comentario
export const commentsTrueResource = '/ComentariosEvento/ListarSomenteExibe';


export const presencesEventResource = '/PresencasEvento';


export const institutionResource = '/Instituicao';


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


