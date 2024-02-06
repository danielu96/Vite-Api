import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';


const Navbar = () => {
 
  return (
    <nav className='bg-base-200'>
    <div className='navbar align-element '>
      <div className='navbar-start'>       
        <NavLink
          to='/'
          className='hidden lg:flex btn btn-primary text-3xl items-center '
        >
          Api-Tests
        </NavLink>       
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <FaBarsStaggered className='h-6 w-6' />
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
          >
            <NavLinks/>
          </ul>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal '><NavLinks/></ul>
      </div>
      <div className='navbar-end'>      
      </div>
    </div>
  </nav>
  );
};
export default Navbar;



// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const NavBar = () => {
//   return (
//     <div style={{width:'100vw',height:'5vh',border:'solid 1px gray',boxShadow:'1px 1px gray', backgroundColor:'whitesmoke',display:'flex', justifyContent:'center',gap:"1rem",paddingTop:'0.5rem' }}>
  
//     <NavLink to="/">Home</NavLink>
//     <NavLink to="/register">Register</NavLink>
//     <NavLink to="/login">Login</NavLink>
//     <NavLink to="/users">Users</NavLink>
//     <NavLink to="/comments">Comments</NavLink>
//     <NavLink to="/tasks">Todos</NavLink>
//     <NavLink to="/Test">Test</NavLink>
//     <NavLink to="/List">List</NavLink>   
//     <NavLink to="/Apiks">Api</NavLink>
//     <NavLink to="/Newsletter">Newsletter</NavLink>
//     <NavLink to="/Stat">Stat</NavLink>
    
//     </div>
//   )
// }

// export default NavBar