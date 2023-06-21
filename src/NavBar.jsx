import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div style={{width:'100vw',border:'solid 1px gray',boxShadow:'1px 1px gray', backgroundColor:'whitesmoke',display:'flex', justifyContent:'center',gap:"1rem" }}>
   Navbar
    <NavLink to="/">Home</NavLink>
    <NavLink to="/List">List</NavLink>
    <NavLink to="/Item">Details</NavLink>
    
    </div>
  )
}

export default NavBar