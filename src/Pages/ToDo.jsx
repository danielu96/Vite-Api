import React from 'react';
import axios from 'axios';
import { useLoaderData,Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
const localData = 'http://localhost:5000/api/tasks/';

// const todoDetailLoader= async ({params})=>{
//   const {id}=params
//   const res = fetch('http://localhost:5000/tasks/'+id)
//   return res.json()
// };

const singleTasksQuery = (id) => {
    return {
      queryKey: ['tasks', id],
      queryFn: async () => {
        const { data } = await axios.get(
          // 'http://localhost:5000/api/tasks/'+id
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
data.taskList[0];
const {
  
    title:title,
    autor:author,
   
  } = singleToDo;
  return (
    <div style={{marginTop:"8rem",gap:"2rem",lineHeight:"5rem"}}>
      <h5>ToDo</h5>
      <p>{id}</p>
      <p>{title}</p>
            <p>{author}</p>
            < Link to={'/tasks'} >back</Link>
    
    </div>
  )
}


export default ToDo