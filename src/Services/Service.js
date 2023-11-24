import axios from 'axios';


export const eventsResource = '/Evento';

export const nextEventResource = '/Evento/ListarProximos';

export const eventsTypeResource = '/TiposEvento';

const apiPort = '7118';
const localApiUri = `https://localhost:${apiPort}/api`;
const externalApiUri = null;

const api = axios.create({
    baseURL: localApiUri
});

export default api;