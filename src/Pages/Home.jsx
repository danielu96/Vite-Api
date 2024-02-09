import React from 'react'
import { Outlet } from 'react-router-dom'
// import Wrapper from '../assets/wrappers/App'
import NavBar from '../Components/Navbar';
const Home = () => {
  return (
    <>
  
<NavBar/>
{/* <Wrapper>    */}
  {/* <div 
  // style={{backgroundImage:'url("vite.svg")'}}
  >
  <h1>Api Tests ...</h1>
  </div> */}
   <section className='align-element py-20'>
<Outlet />
</section>
{/* </Wrapper>     */}
    </>
  )
}

export default Home