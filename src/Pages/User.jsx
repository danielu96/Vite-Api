import React from 'react'
import { useLoaderData,Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/todoCard';
import {customFetch} from '../UTILS/axios'


const singleUserQuery = (id) => {
  return {
    queryKey: ['singleUser', id],
    queryFn: () => customFetch(`/${id}`),
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleUserQuery(params.id)
    );
    return { user:response.data.user};
  };

const User = () => {
    const { user}=useLoaderData();  
  return (
    <Wrapper>
    <div className='place-items-center justify-center text-center'>    
        <p>{user.email}</p> 
        <h1>{user.name}</h1>  
        {/* <span>{user.lastName}</span> */}
        {/* <p>{user.location}</p> */}

       <p>< Link to={'/users'} >back</Link></p>  
         </div>
         </Wrapper>  
  )
  
}

export default User