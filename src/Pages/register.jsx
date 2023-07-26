import React from 'react';
import {  useState } from 'react';
import Wrapper from '../assets/wrappers/App';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const initialState= {
  name:'',
  email:'',
  password:'',
  isMember:true,
};


const Register = () => {
  // const [values,setValues]=useState(initialState);
    const [name , setName] = useState('');  
    const [autor , setAutor] = useState('');  
    const [email , setEmail] = useState('');  
    const [password , setPassword] = useState('');  
    const [confirmPassword , setConfirmPassword] = useState('');  

    // const handleChange = (e)=> {
    //   const name= e.target.name;
    //   const value= e.target.value;
    // }

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        createTask(name && email, {
          onSuccess: () => {
            setName('');
            setEmail('');
          },
        });
    }
  return (
    <>
    <Wrapper>      
    <ToastContainer 
     position="top-center"
     />
    <div className='container'>
        <h3>Register</h3>
    <form style={{display:'grid',alignContent:'center', justifyContent:'center'}}
    // onSubmit={(e)=>setTitle( e.target.value)}
    >
          <label style={{margin:'auto auto 7px 0px'}} htmlFor='title'>Name</label>     
      <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='text'
      id='name'
      value={name}
      onChange={(e)=>setName( e.target.value)}
      ></input> 
      <label style={{height:"1.3rem",margin:'auto auto 1px 1px '}} htmlFor='title'>Email</label>     
      <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='email'
      id='email'
      value={email}
      onChange={(e)=>setEmail( e.target.value)}
      ></input> 
       <label style={{margin:'auto auto 7px 0px'}} htmlFor='autor'>Password</label>
     <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='password'
      id='password'
      value={password}
      onChange={(e)=>setPassword( e.target.value)}
      ></input>   
       <label style={{margin:'auto auto 7px 0px'}} htmlFor='autor'>Confirm Password</label>
     <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none"}}
      type='password'
      id='confirmPassword'
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword( e.target.value)}
      ></input>           
   <button onClick={handleSubmit}>Sign Up</button>
  <div style={{marginTop:"1rem"}}> Already have an acount? <Link to={'/login'}>Login Here</Link></div>
     </form>      
    </div>    
   
    </Wrapper>
    </>
  )
}

export default Register