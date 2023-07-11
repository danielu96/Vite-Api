import { useDeleteTask, useEditTask } from './reactQueryCustomHooks';
import { Link } from 'react-router-dom';

const SingleItem = ({ item }) => {
  const { editTask } = useEditTask();
  const { deleteTask, deleteTaskLoading } = useDeleteTask();

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      {/* <span>{item.autor}</span> */}
      {/* <Link to={`/coctail/${id}`}>details</Link> */}
      <button
        className='btn remove-btn'
        type='button'
        disabled={deleteTaskLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
