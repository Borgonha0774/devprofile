/* Configuração do axios para acessar as rotas (backend) */
import axios from 'axios';

/* URL base  */
export const api = axios.create({ baseURL: 'http://192.168.1.20:3333' });
