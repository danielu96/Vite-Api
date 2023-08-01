import React from 'react';
import {  useState } from 'react';
import Wrapper from '../assets/wrappers/App';
import { ToastContainer } from 'react-toastify';
import { Link,Form,useNavigation,redirect  } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UsersUrl = 'http://localhost:5000/api/users';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.post(UsersUrl, data);

    toast.success(response.data.msg);
    return redirect('/users');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};




// const initialState= {
//   name:'',
//   email:'',
//   password:'',
//   isMember:true,
// };


const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  // const [values,setValues]=useState(initialState);
    // const [name , setName] = useState('');      
    // const [email , setEmail] = useState('');  
    // const [password , setPassword] = useState('');  
    // const [confirmPassword , setConfirmPassword] = useState('');  

    // const handleChange = (e)=> {
    //   const name= e.target.name;
    //   const value= e.target.value;
    // }

    // const handleSubmit = async (e) =>{
    //     e.preventDefault(); 
    //     createTask(name && email, {
    //       onSuccess: () => {
    //         setName('');
    //         setEmail('');
    //       },
    //     });
    // }
  return (
    <>
    <Wrapper>      
    <ToastContainer 
     position="top-center"
     />
    <div className='container'>
        <h3>Register</h3>
    <Form method='POST'style={{display:'grid',alignContent:'center', justifyContent:'center'}}
    // onSubmit={(e)=>setTitle( e.target.value)}
    >
          <label style={{margin:'auto auto 7px 0px'}} htmlFor='title'>Name</label>     
      <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='text'
      name='name'
      id='name'
      // value={name}
      // onChange={(e)=>setName( e.target.value)}
      ></input> 
      <label style={{height:"1.3rem",margin:'auto auto 1px 1px '}} htmlFor='title'>Email</label>     
      <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='email'
      name='email'
      id='email'
      // value={email}
      // onChange={(e)=>setEmail( e.target.value)}
      ></input> 
       <label style={{margin:'auto auto 7px 0px'}} htmlFor='autor'>Password</label>
     <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='password'
      name='password'
      id='password'
      // value={password}
      // onChange={(e)=>setPassword( e.target.value)}
      ></input>   
       {/* <label style={{margin:'auto auto 7px 0px'}} htmlFor='autor'>Confirm Password</label>
     <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none"}}
      type='password'
      id='confirmPassword'
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword( e.target.value)}
      ></input>            */}
   <button type='submit' disabled={isSubmitting}> {isSubmitting ? 'submitting' : 'submit'}</button>
  <div style={{marginTop:"1rem"}}> Already have an acount? <Link to={'/login'}>Login Here</Link></div>
     </Form>      
    </div>    
   
    </Wrapper>
    </>
  )
}

export default Register