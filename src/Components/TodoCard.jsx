import React from 'react'
import { Link } from 'react-router-dom'

const TodoCard = ({id,title,autor,email}) => {
  return (
    <div>
    <h4> {title}</h4> 
    <p>{autor},{email}</p>
    <Link to={`/todo/${id}`}>details</Link>
    </div>
  )
}

export default TodoCard