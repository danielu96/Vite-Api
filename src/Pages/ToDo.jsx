import {React } from 'react'
import { useLoaderData , Link} from 'react-router-dom';
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
  <>
  <div className='justify-center mx-auto'>  
        <div className='mt-6 grid gap-y-10 lg:grid-cols-1  text-center  lg:gap-x-16 mx-auto'>   
               <div>
        <h4 className='capitalize text-xl font-bold'>author: {task.author}</h4>
        <p className='mt-2 '>task: {task.title}</p>
        <p className='mt-2 text-pretty'>email: {task.email}</p>    
      <div className='mt-2'>status: <p  style={{          
                  textTransform: 'capitalize',
                  textDecoration: task.isDone && 'line-through',
                }}>   {task.isDone ? 'done' : 'undone'} 
   
      </p>   
        </div> 
        <div className='mt-6'>               
        </div>        
        <div className='mt-10 '>         
        </div>
      </div>
    </div>
    <div className=' text-md breadcrumbs'>
      <ul className='justify-center'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/tasks'>Tasks</Link>
        </li>
      </ul>
    </div>
    </div>
    </>
      )
}

export default ToDo