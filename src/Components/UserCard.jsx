import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/todoCard'

const TodoCard = ({id,email,password,name}) => {
  return (
    <Wrapper>
      <div className='card'>
    <h5> {name}</h5> 
    <p>{email}</p>
    <p>{password}</p>
    <Link 
    to={`/users/${id}`}
    // to={`/${title}`}
    >details</Link>
    </div>
    </Wrapper>
  )
}

export default TodoCard