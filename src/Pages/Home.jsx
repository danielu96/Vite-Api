import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
// import Wrapper from '../assets/wrappers/App'
import {Loading, Navbar} from '../Components';
const Home = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
  
<Navbar/>
{isPageLoading ? (
        <Loading />
      ) : (
        <section className='align-element py-20'>
          <Outlet />
        </section>
      )}
{/* <Wrapper>    */}
  {/* <div 
  // style={{backgroundImage:'url("vite.svg")'}}
  >
  <h1>Api Tests ...</h1>
  </div> */}  
    </>
  )
}

export default Home