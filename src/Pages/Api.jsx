import React from 'react'
import customFetch from '../Components/utils';
import { useLoaderData } from 'react-router-dom';
// import Items from '../Components/Items';
import ApiList from '../Components/ApiList';

// const url = '/';
const TasksQuery = {
  queryKey: ['tatanka'],
  queryFn: () => customFetch.get('/'),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(TasksQuery);
  const data = response.data.taskList;
  console.log(data);
  return { data:response.data.taskList };
};


const Apiks = () => {  
  return (
    <>
    <div>
      <h1>Api</h1>
      <p></p>

    </div>
    <ApiList/>
    </>
  )
}

export default Apiks