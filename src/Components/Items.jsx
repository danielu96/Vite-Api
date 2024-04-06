import { useFetchTasks } from './reactQueryCustomHooks';
import { Link,useLoaderData } from 'react-router-dom';
import { useDeleteTask, useEditTask } from './reactQueryCustomHooks';

const Items = () => {
  const {items}=useLoaderData();
  console.log(items);
  const { editTask } = useEditTask();
  const { deleteTask, deleteTaskLoading } = useDeleteTask();
  const { isLoading, isError, data } = useFetchTasks();
console.log(data)
  if (isLoading) {
    return <p style={{ marginTop: '1rem ' }}>Loading...</p>;
  }
  if (isError) {
    return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
  }

  return (
    <>
 
    <div className='mt-8  mx-8 overflow-y-auto ' >
    <div className='flex justify-center font-medium'>Your Tasks: {items.taskList.length}</div>
    <div className='flex justify-center font-medium'>Your Tasks: {data.data.taskList.length}</div>
        <table className='w-full table '  >
        <thead >
            <tr className='border-current'>  
            <th>Status</th>           
              <th>Title</th>
              <th>Author</th>    
              <th className='hidden sm:block'>Email</th>  
              <th>Link</th>    
              <th>Action</th>             
            </tr>
          </thead>
     <tbody>
        {data.data.taskList.map((item) => {  
                     return (                     
                    <tr  key={item.id}>  
                    <td>
                    <input 
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
                      </td>     
                <td 
                 style={{          
                  textTransform: 'capitalize',
                  textDecoration: item.isDone && 'line-through',
                }}
                >{item.title}</td>         
         <td>{item.author}</td>
         <td className='hidden sm:block'>{item.email}</td>
         <td>
         <Link
       to={`/tasks/${item.id}`}
       >details</Link>
         </td>
         <td >  <button
        className='btn btn-primary max-w-20 btn-xs '
        type='button'
        disabled={deleteTaskLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button></td>
                   </tr>         
          )            
        })}
            </tbody>
            </table>
        </div>
    {/* <div >
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div> */}
       
    </>
  );
};
export default Items;
