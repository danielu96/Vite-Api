import React from 'react'
import { Link } from 'react-router-dom';
import TodoCard from './TodoCard';
import { useLoaderData } from 'react-router-dom';

const TodoList = () => {
  const {items}=useLoaderData();
  console.log(items);
    // const formattedTodos = taskList.map((item)=>{
    //     const {id,name,body,email}=item
    //     return {
    //         id,
    //         name,
    //         body,
    //         email
    //     }
    //     });

  return (
    <>
    <div className='flex justify-center mt-5 '> info from TodoList {items.taskList.length}</div>
    <div style={{marginTop:'4rem',width:"80vw",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px, 1fr))",gap:'2rem' }}>
        {items.taskList.map((item) => {
    return (      
//   <Link to={`/tasks/${title}`} key={todo.id} style={{marginTop:"1rem"}} ><p>autor{todo.autor}</p><p>title:{todo.title}</p></Link>
      //  <div key={item.id}>{item.title}</div>
        <TodoCard key={item.id} {...item}/>
    )
})}
     </div>
     </>
  )
}

export default TodoList