import axios from 'axios';


import { getUserFromLocalStorage } from './localStorage';

export const JobsFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/jobs/' ,
  // baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});
const customFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/users' ,
  // baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});
export const tasksFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/tasks/' ,
  // baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});


// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });
// JobsFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;