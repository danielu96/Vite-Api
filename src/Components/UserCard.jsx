import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/todoCard'



const UserCard = ({id,email,name}) => {
  const {item}= useLoaderData();
  return (
    <Wrapper>
      <div className='card'>
    <h5> {name}</h5> 
    <p>{email}</p>
    {/* <p>{password}</p> */}
    <Link 
    //  key={user.id}
    to={`/users/${id}`}
    // to={`/${title}`}
    >details</Link>
    </div>
    </Wrapper>
  )
}

export default UserCard