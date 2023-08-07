import {  useQuery } from '@tanstack/react-query';
import { useEditUser } from '../../Components/usersCustomHooks';
import { useDeleteUser } from '../../Components/usersCustomHooks';

async function fetchComments(userId) {
  const response = await fetch(
    `http://localhost:5000/api/users?userId=${userId}`
  );
  return response.json();
}

export function NewUserDetail({ user }) {
  const { deleteUser } = useDeleteUser();
  const { editUser } = useEditUser();
  const { data, isLoading, isError, error } = useQuery(
    ["users", user.id],
    () => fetchComments(user.id)
  );
 
  if (isLoading) {
    return <h3>Loading!</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  }
  return (
    <>
      <h3 style={{ color: "blue" }}>{user.name}</h3>        
      
           <h4>Info about User</h4>     
      <p>user number: {user.id}</p>
      <p>user email: {user.email}</p>
      <p>user password: {user.password}</p>
      <button style={{width:"4rem"}}       
        type='button'     
        onClick={() => deleteUser(user.id)}
      >
        delete
      </button>   
      <button style={{width:"4rem"}}       
        type='button'       
        onClick={() => editUser(user.id)}
      >
        update title
      </button>
    </>
  );
}