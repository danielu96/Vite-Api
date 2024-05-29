import axios from 'axios';

export const customVisitFetch = axios.create({
  baseURL: 'http://localhost:5000/api/visits',
});


const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/tasks',
});


export default customFetch;
