import React from 'react'
import {  useState } from 'react';
import Wrapper from '../assets/wrappers/App';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
const Login = () => {


    const [title , setTitle] = useState('');  
    const [autor , setAutor] = useState('');  

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        createTask(title && autor, {
          onSuccess: () => {
            setTitle('');
            setAutor('');
          },
        });
    }

  return (
    <>
    <Wrapper>      
    <ToastContainer 
     position="top-center"
     />
    <div className='container-login'>
        <h3>Login</h3>
    <form style={{display:'grid',alignContent:'center', justifyContent:'center'}}
    onSubmit={handleSubmit}
    >
      <label style={{margin:'auto auto 7px 0px'}} htmlFor='title'>Email</label>     
      <input 
           style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='text'
      id='title'
      value={title}
      onChange={(e)=>setTitle( e.target.value)}
      ></input> 
       <label style={{margin:'auto auto 7px 0px'}} htmlFor='autor'>Password</label>
     <input 
      style={{height:"1.3rem",background:'#f7f7f7',borderRadius:"5px",border:"none",marginBottom:"5px"}}
      type='text'
      id='autor'
      value={autor}
      onChange={(e)=>setAutor( e.target.value)}
      ></input>            
   <button onClick={handleSubmit}>submit</button>
  <div style={{marginTop:"1rem"}}> Not a member yet? <Link to={'/register'}>Register</Link></div>
     </form>      
    </div>    
   
    </Wrapper>
    </>
  )
}

export default Login