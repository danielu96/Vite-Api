import React from 'react'
import { Link } from 'react-router-dom';
import TodoCard from './TodoCard';

const TodoList = ({items}) => {

    const formattedTodos = items.map((item)=>{
        const {id,title,author,email}=item
        return {
            id,
            title,
            author,
            email
        }
        });

  return (
    <div style={{marginTop:'4rem',width:"80vw",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px, 1fr))",gap:'2rem' }}>
        {formattedTodos.map((item) => {
    return (      
//   <Link to={`/tasks/${title}`} key={todo.id} style={{marginTop:"1rem"}} ><p>autor{todo.autor}</p><p>title:{todo.title}</p></Link>
       
        <TodoCard key={item.id} {...item}/>
    )
})}
     </div>
  )
}

export default TodoList