import React from 'react'
import TodoList from '../Component/TodoList'
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
const localData = 
'http://localhost:5173/DATA/db.json'
// "../DATA/db.json"
 ;

export const loader = async ()=>{
    // const searchTerm="";
    const response= await axios.get   (`${localData}`)
   
   
    ;
    console.log(response)
    return {items:response.data.asks}
  };


const Todos = () => {
    const {items}=useLoaderData();
    console.log(items);
  return (
    <div>
        <TodoList items={items}/>
    </div>
  )
}

export default Todos