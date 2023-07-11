import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div style={{width:'100vw',height:'5vh',border:'solid 1px gray',boxShadow:'1px 1px gray', backgroundColor:'whitesmoke',display:'flex', justifyContent:'center',gap:"1rem",paddingTop:'0.5rem' }}>
  
    <NavLink to="/">Home</NavLink>
    <NavLink to="/tasks">Todos</NavLink>
    <NavLink to="/Test">Test</NavLink>
    <NavLink to="/List">List</NavLink>   
    <NavLink to="/Api">Api</NavLink>
    <NavLink to="/Newsletter">Newsletter</NavLink>
    
    </div>
  )
}

export default NavBar