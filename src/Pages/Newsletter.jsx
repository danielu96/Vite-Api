import React from 'react'
import { Form,useNavigation,redirect } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

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

const Newsletter = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
  return (
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


  )
 
  
}

export default Newsletter