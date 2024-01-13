import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from './assets/wrappers/App'
import NavBar from './NavBar'
import { ToastContainer } from 'react-toastify';
const Home = () => {
  return (
    <>
  
<NavBar/>
<Wrapper>  
  <ToastContainer position="center"/>
  <div 
  // style={{backgroundImage:'url("vite.svg")'}}
  >
  <h1>WELCOME TO ...</h1>
  </div>
<Outlet />
</Wrapper>
  
   
    </>
  )
}

export default Home