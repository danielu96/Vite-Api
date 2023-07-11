import { useState } from 'react';
import { useCreateTask } from '../Components/reactQueryCustomHooks';

const Form = () => {
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');

  const { isLoading, createTask } = useCreateTask();
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask( autor && title, {
      onSuccess: () => {
        setTitle('');
        setAutor('');
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>TASKS</h4>
      <div className='form-control'>
        <label >Title</label>
        <input
          type='text '
          className='form-input'
          id='title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
         <label >Autor</label>
         <input
          type='text '
          className='form-input'
          id='autor'
          value={autor}
          onChange={(event) => setAutor(event.target.value)}
        ></input>
        <button type='submit' className='btn' disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  );
  
};

export default Form;
