import React from 'react'
import { Form,useNavigation,redirect, useLoaderData } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
// import Stat from '../Components/Stat';
import { QueryClient } from '@tanstack/react-query';
import customFetch from '../Components/utils';
import Items from '../Components/Items';
import { useFetchTasks } from '../Components/ReactQueryCustomHooks';

const newsletterUrl = 'http://localhost:5000/api/tasks';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.post(newsletterUrl, data);

    toast.success(response.data.msg);
    return redirect('/tasks');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
// const localData = 
// 'http://localhost:5000/api/tasks'
// // "https://jsonplaceholder.typicode.com/comments"
// // "../DATA/db.json"
//  ;

// export const loader = async ()=>{
//   // const searchTerm="";
//   // const response= await axios.get   (`${localData}`)
//  const response = await customFetch.get('/')
 
//   ;
//   console.log(response)
//   return {items:response.data.taskList}
// };

const Newsletter = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const {data} = useFetchTasks()
    console.log(data)
  return (
    <>

    <div>
      
    </div>
    <Form className='form' method='POST'>
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        our newsletter
      </h4>
      {/* name */}
      <div className='form-row'>
        <label  className='form-label'>
          title
        </label>
        <input
          type='text'
          className='form-input'
          name='title'
          id='title'
          required
        />
      </div>
      {/* lastName */}
      <div className='form-row'>
        <label  className='form-label'>
          autor
        </label>
        <input
          type='text'
          className='form-input'
          name='author'
          id='author'
          required
        />
      </div>
      {/* email */}
      <div className='form-row'>
        <label  className='form-label'>
          email
        </label>
        <input
          type='text'
          className='form-input'
          name='email'
          id='email'
          defaultValue='test@test.com'
          required
        />
      </div>
      <button
        type='submit'
        className='btn btn-block'
        style={{ marginTop: '0.5rem' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting' : 'submit'}
      </button>
      
    </Form>
    {/* <div>{data.data.length}</div> */}
<Items/>
</>
  )
 
  
}

export default Newsletter