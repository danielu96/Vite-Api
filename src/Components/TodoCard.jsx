import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/todoCard'

const TodoCard = ({id,email,author,title}) => {
  return (
    <Wrapper>
      <div className='card'>
    <h5> {title}</h5> 
    <p>{author}</p>
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