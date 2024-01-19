import {React,useState } from 'react'
import { useLoaderData , Link} from 'react-router-dom';
import customFetch from '../Components/utils'
import { tasksFetch } from '../UTILS/axios';

 const singleTaskQuery = (id) => {
  return {
    queryKey: ['singleTask', id],
    queryFn: () => tasksFetch(`/${id}`),
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleTaskQuery(params.id)
    );
    return { task:response.data.task};
  };

const ToDo = () => {
  const { task } = useLoaderData();  
  console.log(task)
  
  return (
    <section>
    <div className='text-md breadcrumbs'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/tasks'>Tasks</Link>
        </li>
      </ul>
    </div>
        <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>   
               <div>
        <h4 className='capitalize text-3xl font-bold'>{task.author}</h4>
        <p>{task.title}</p>
        <p>{task.email}</p>      
        <div className='mt-6'>               
        </div>        
        <div className='mt-10 '>        
        </div>
      </div>
    </div>
  </section> 
      )
}

export default ToDo