import {  useQuery } from '@tanstack/react-query';
import { useEditUser } from '../../Components/usersCustomHooks';
import { useDeleteUser } from '../../Components/usersCustomHooks';

async function fetchComments(jobId) {
  const response = await fetch(
    // `http://localhost:5000/api/users?userId=${userId}`
    `http://localhost:5000/api/jobs?jobId=${jobId}`
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
    return <p className='ml-5 mt-6'>Loading!</p>;
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
    <div className='w-auto ml-20'>
      <h3 style={{ color: "blue", marginTop:"0.1rem",marginBottom:"1rem" }}>{user.name}</h3>       
                
          <div className='flex'>company: <p className='font-bold ml-1'>{user.company}</p></div>
      <p>comment: {user.comment}</p>
      <div className='mt-7'>
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
        update
      </button>
      </div>
      </div>
    </>
  );
}