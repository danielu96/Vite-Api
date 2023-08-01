import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/todoCard'

const TodoCard = ({id,email,body,name}) => {
  return (
    <Wrapper>
      <div className='card'>
    <h5> {name}</h5> 
    <p>{body}</p>
    <p>{email}</p>
    <Link 
    to={`/tasks/${id}`}
    // to={`/${title}`}
    >details</Link>
    </div>
    </Wrapper>
  )
}

export default TodoCard