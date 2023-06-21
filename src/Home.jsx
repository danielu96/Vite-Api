import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from './assets/wrappers/App'
import NavBar from './NavBar'

const Home = () => {
  return (
    <>
    <Wrapper>
    <div>
<NavBar/>
<Outlet/>
    </div>
    </Wrapper>
    </>
  )
}

export default Home