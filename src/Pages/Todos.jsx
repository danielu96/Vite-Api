import React from 'react'
import TodoList from '../Components/TodoList'
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
const localData = 
'http://localhost:5000/api/tasks' ;
export const loader = async ()=>{   
    const response= await axios.get   (`${localData}`);
    console.log(response)
    return {items:response.data}
  };
const Todos = () => {
    const {items}=useLoaderData();
    console.log(items);
  return (
    <>
   <div>
    <h3 style={{marginBottom:"1rem"}}>Info from Todos</h3>
    <p>Your Tasks: {items.taskList.length}</p>
   
{items.taskList.map((item)=>{
  return(
    <div key={item.id}>
      <h5>{item.title}</h5>,
      <p>{item.author}</p> 
    </div>
  )
})}
   </div>   
   <TodoList/>        
 </>
  )
}

export default Todos