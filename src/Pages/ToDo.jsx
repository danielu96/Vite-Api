import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
const localData = 'http://localhost:5000/api/tasks' ;

const singleToDoQuery = (id) => {
    return {
      queryKey: ['tasks', id],
      queryFn: async () => {
        const { data } = await axios.get(`${localData}${id}`);
        console.log({id})
        return data;
      },
    };
  };
  
  export const loader =
    (queryClient) =>
    async ({ params }) => {
      const { id} = params;
      await queryClient.ensureQueryData(singleToDoQuery(id));
      return { id };
    };

const ToDo = () => {
    const { id}=useLoaderData();
    // const { autor}=useLoaderData();
const { data } = useQuery(singleToDoQuery(id));
const singleToDo = data.items[0];
const {
  
    title:name,
    autor:autor,
   
  } = singleToDo;
  return (
    <div>ToDo
        {name},
        {autor}
      
    </div>
  )
}

export default ToDo