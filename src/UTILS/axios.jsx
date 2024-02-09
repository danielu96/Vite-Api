import axios from 'axios';


import { getUserFromLocalStorage } from './localStorage';

export const jobsFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/jobs/'   
});
export const customFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/users/'  
});
export const tasksFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/tasks/'  
});
export const usersFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/users/'   
});
export const newsletterFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/newsletter/'   
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