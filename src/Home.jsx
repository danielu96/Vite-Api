import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from './assets/wrappers/App'
import NavBar from './NavBar'

const Home = () => {
  return (
    <>
  
<NavBar/>
<Wrapper>  
<Outlet />
</Wrapper>
  
   
    </>
  )
}

export default Home