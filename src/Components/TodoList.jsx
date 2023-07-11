import React from 'react'
import TodoCard from './TodoCard';

const TodoList = ({items}) => {

    const formattedTodos = items.map((item)=>{
        const {id,title,autor,email}=item
        return {
            id,
            title,
            autor,
            email
        }
        });

  return (
    <div style={{marginTop:'4rem',width:"80vw",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px, 1fr))",gap:'2rem' }}>
        {formattedTodos.map((item) => {
    return (
        <TodoCard key={item.id} {...item}/>
    )
})}
    </div>
  )
}

export default TodoList