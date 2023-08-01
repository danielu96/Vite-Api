import React from 'react'
import axios from 'axios';
import { useLoaderData,Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Wrapper from '../assets/wrappers/todoCard';
const localData = 'http://localhost:5000/api/users?id=1';

const singleUserQuery = (id) => {
    return {
      queryKey: ['users', id],
      queryFn: async () => {
        const { data } = await axios.get(
          // 'http://localhost:5000/api/users/'+id
          `${localData}${id}`
          );
        console.log({data,id})
        return data;
      },
    }; 
  };  
  export const loader =
    (queryClient) =>
    async ({ params }) => {
      const { id} = params;     
      await queryClient.ensureQueryData(singleUserQuery(id));
      console.log({singleUserQuery})
      return { id };
    };

const User = () => {
    const { id}=useLoaderData();
    const { data } = useQuery(singleUserQuery(id));
    const singleToDo = data.userList[0];
    // data.map.userList((user) =>{
    //   if (user.id===id) {
    //     return{...user,email}
    //   }
    // });
    //  items.map((task) => {
//   if (task.id === id) {
//     return { ...task };
//   }
//   return task;
// });
const {  
    email:email,  
    name:name,
    password:password,
      
  } = singleToDo;
  return (
    <Wrapper>
    <div className='card'>
        <h3>User id is:</h3>
         {id}
        <p>{email}</p> 
        <h1>{name}</h1>
        <span>{password}</span>
       <p>< Link to={'/users'} >back</Link></p>  
         </div>
         </Wrapper>  
  )
  
}

export default User