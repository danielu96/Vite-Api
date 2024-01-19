import React from 'react'
import { useLoaderData } from 'react-router-dom'

const ApiList = () => {
    const {data}= useLoaderData();
    console.log(data);
  return (
    <div>
     <h2>ApiList</h2> 
     <p>{data.length}</p>
     {data.map((task) => {
    return  <div key={task.id}>{task.title}- created by {task.author}</div>
     })}
     <p></p> 
        </div>
  )
}

export default ApiList