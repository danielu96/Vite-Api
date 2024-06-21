import axios from 'axios';

const productionUrl = 'http://localhost:5173/api/v1';





import { getUserFromLocalStorage } from './localStorage';

export const customFetch = axios.create({
  baseURL: productionUrl 
});

export const jobsFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/jobs/'   
});
// export const customFetch = axios.create({ 
//   baseURL:  'http://localhost:5000/api/users/'  
// });
export const tasksFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/tasks/'  
});
export const usersFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/'   
});
export const newsletterFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/v1/newsletter/'   
});
export const appointmentsFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/appointments/'   
});
export const visitsFetch = axios.create({ 
  baseURL:  'http://localhost:5000/api/visits/'   
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