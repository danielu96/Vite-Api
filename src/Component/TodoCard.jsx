import React from 'react'
import { Link } from 'react-router-dom'

const TodoCard = ({id,title,autor}) => {
  return (
    <div>
    <h1> {title}</h1> 
    <p>{autor}</p>
    <Link to={`/todo/${id}`}>details</Link>
    </div>
  )
}

export default TodoCard