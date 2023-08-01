import React from 'react'
import UserList from '../Components/UserList'
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
const localData = 
'http://localhost:5000/api/users'
// "../DATA/db.json"
 ;

export const loader = async ()=>{
    // const searchTerm="";
    const response= await axios.get   (`${localData}`)
   
   
    ;
    console.log(response)
    return {items:response.data.userList}
  };


const Users = () => {
    const {items}=useLoaderData();
    console.log(items);
  return (
    <div >
        <UserList items={items}/>
    </div>
  )
}

export default Users