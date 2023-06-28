import React from 'react'
import TodoCard from './TodoCard';

const TodoList = ({items}) => {

    const formattedTodos = items.map((item)=>{
        const {id,title,autor}=item
        return {
            id,
            title,
            autor
        }
        });

  return (
    <div>TodoList
        {formattedTodos.map((item) => {
    return (
        <TodoCard key={item.id} {...item}/>
    )
})}
    </div>
  )
}

export default TodoList