import axios from 'axios';


 const customFetchUsers = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

export default customFetchUsers;