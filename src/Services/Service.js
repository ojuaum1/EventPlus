import axios from 'axios';


export const eventsResouce = '/Evento';

export const nextEventResouce = '/Evento/ListarProximos';

export const eventsTypeResouce = '/TiposEvento';

const apiPort = '7118';
const localApiUri = `https://localhost:${apiPort}/api`;
const externalApiUri = null;

const api = axios.create({
    baseURL: localApiUri
});

export default api;