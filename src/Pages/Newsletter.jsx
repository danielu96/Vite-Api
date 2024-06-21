import React from 'react';
import { redirect,Form } from 'react-router-dom';
import  {FormInput,SubmitBtn} from '../Components';
// import { customFetch } from '../UTILS/customFetch.jsx';
import { customFetch } from '../UTILS/axios';
import { toast } from 'react-toastify';
import NewsletterList from '../Components/NewsletterList'


// export const newsletterQuery = (params,user) => {
//   return {
//     queryKey: [
//       'newsletter',
//       user.name,    
//     ],
//     queryFn: () =>
//     newsletterFetch.get('/', {
//         params  ,
//         headers: {          
//           Authorization: `Bearer ${user.token}`,          
//         },            
//       }),      
//   };  
// };

export const newsletterQuery = ( user) => {
  return {
    queryKey: [
      'newsletter',
      user.name,
      // params.page ? parseInt(params.page) : 1,    
    ],
    queryFn: () =>
      customFetch.get('/newsletter', {
        // params,        
        headers: {          
          Authorization: `Bearer ${user.token}`,          
        },        
      }),      
  };  
};



export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must be logged in to view newsletter');
      return redirect('/login');
    }
    // const params = Object.fromEntries([
    //   ...new URL(request.url).searchParams.entries(),
    // ]);
    try {
      const response = await queryClient.ensureQueryData(
        newsletterQuery( user)
      );

      return {
        data: response.data,
        totalMessages:response.data.totalMessages    
      
      };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error accessing your newsletter';

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect('/login');
      return null;
    }
  };





export const action =
  (store , queryClient) =>
  async ({ request }) => {    
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const {email} = Object.fromEntries(formData);    
    try {
      const response = await customFetch.post(
        '/newsletter', {email}           
      )    
      console.log(response);   
      queryClient.removeQueries(['newsletter'])
      // queryClient.invalidateQueries({ queryKey: ['newsletter'] });   
      toast.success('we have your mail now');     
      return redirect('/Newsletter');
    }     
 catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.msg 
      ||   'there was an error to send your email';
    toast.error(errorMessage);
    if (error?.response?.status === 401 || 403) return redirect('/newsletter');  
    return null;
  }
  };
  
const Newsletter = () => {
  return (
    <>   
  <div   className='mx-16 mt-16 grid gap-8  md:grid-cols-2 items-start '>   
    <Form  method='POST'className='flex flex-col gap-y-4'>
    <h3 className='font-medium font-bold text-4xl'>
          Join to our newsletter
        </h3>   
       <div className='mt-4'>
       <FormInput type='email' name='email'  label='email address' />         
      </div>
      <SubmitBtn text='Submit'        
         />
    </Form>  
    <div className='mt-14 text-center' ><h1 className='text-4xl font-bold leading-none tracking-tight sm:text-6xl mb-6 '>If you subscribe</h1><span className='text-2xl'>you will receive a</span> <div className='ml-2 stats bg-primary shadow'>
          <div className='stat'>  <div className='stat-title text-primary-content text-4xl font-bold tracking-widest items-end'>10% off</div></div></div> </div>  
              </div>  
              <NewsletterList/>    
           </>
  )
}
export default Newsletter