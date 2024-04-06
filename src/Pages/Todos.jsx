import React from 'react'
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form,useNavigation,redirect } from 'react-router-dom'
import FormInput from '../Components/FormInput';
import Items from '../Components/Items';
import customFetch from '../Components/utils';
import TodoList from '../Components/TodoList';


export const tasksQuery = (params) => {
  return {
    queryKey: [
      'tasks'          
    ],
    queryFn: () =>
      customFetch.get('/', {
        params,        
            
      }),      
  };  
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
   
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        tasksQuery(params)
      );

      return {
        items: response.data,
        // totalMessages:response.data.totalMessages        
      };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error accessing your contact';

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect('/tasks');
      return null;
    }
  };

const tasksUrl = 'http://localhost:5000/api/tasks';

export const action = 
( queryClient) =>
async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.post(tasksUrl, data);
    queryClient.removeQueries(['taskyos']); 
    toast.success(response?.data?.msg);
    return redirect('/tasks');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};




// const localData = 
// 'http://localhost:5000/api/tasks' ;
// export const loader = async ()=>{   
//     const response= await axios.get   (`${localData}`);
//     console.log(response)
//     return {items:response.data}
//   };
const Todos = () => {  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';  
    const {items}=useLoaderData();
    console.log(items);
  return (
    <>
       <div className=' flex font-medium justify-center text-3xl mx-auto'>Tasks Maker</div>  
    <div   className='mt-12 grid gap-8 md:grid-cols-2  mx-auto max-w-7xl'>   
    <Form method='POST' className='flex flex-col gap-y-4 '>
      <h4 className='mb-2 font-medium'>
      Create task
      </h4>     
      <div>
      <FormInput type='text' name='title'  label='title'/>
      </div> 
         <div> 
      <FormInput type='text' name='author'  label='author'/>        
      </div>      
      <div> 
      <FormInput type='email' name='email'  label='email address'/>  
      </div>     
      <button
        type='submit'        
        className='btn btn-primary btn-block'       
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting' : 'submit'}       
      </button>      
    </Form>           
</div> 
<Items/> 
<TodoList/>
 </>
  )
}

export default Todos