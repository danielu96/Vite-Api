import React from 'react';
import axios from 'axios';
import { useLoaderData,Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// const localData = 'http://localhost:5000/api/tasks/${id}';
const fakeData= "https://jsonplaceholder.typicode.com/comments?postId=1"

// const todoDetailLoader= async ({params})=>{
//   const {id}=params
//   const res = fetch('http://localhost:5000/tasks/'+id)
//   return res.json()
// };

const singleTasksQuery = (id) => {
    return {
      queryKey: ['comments', id],
      queryFn: async () => {
        const { data } = await axios.get(
          // 'http://localhost:5000/api/tasks/'+id
          `${fakeData}${id}`
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
      await queryClient.ensureQueryData(singleTasksQuery(id));
      console.log({singleTasksQuery})
      return { id };
    };


const ToDo = () => {
    const { id}=useLoaderData();
    const { data } = useQuery(singleTasksQuery(id));
    // const  {data} = useLoaderData(); 

const singleToDo = 
//  items.map((task) => {
//   if (task.id === id) {
//     return { ...task };
//   }
//   return task;
// });
data[0];
const {
  
    name:title,
    email:email,
    body:body,
   
  } = singleToDo;
  return (
    <div style={{marginTop:"8rem",gap:"2rem",lineHeight:"5rem"}}>
      <h5>ToDo</h5>
      <p>{id}</p>
      <p>{title}</p>
      <p>{email}</p>
            <p>{body}</p>          
            < Link to={'/tasks'} >back</Link>
    
    </div>
  )
}
export default ToDo