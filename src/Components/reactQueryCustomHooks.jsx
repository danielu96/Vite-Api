import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { customVisitFetch } from './utils';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { newsletterFetch } from '../UTILS/axios';

export const useFetchNewsletter = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['newsletter'],
    queryFn: async () => {
      const { data } = await newsletterFetch.get('/');
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useFetchTasks = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/');
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn:  ({title,author,email}) => customFetch.post(`/ ${ author},${title },${email }`),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.removeQueries(['tasks']);  
      toast.success(response?.data?.msg);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading };
};
export const useCreateVisit = () => {
  const queryClient = useQueryClient();
  const { mutate: createVisit, isLoading } = useMutation({
    mutationFn:  ({title,date}) => customVisitFetch.post(`/ ${ title},${date }`),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.removeQueries(['visits']);  
      toast.success(response?.data?.msg);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createVisit, isLoading };
};

// const {mutate:createTask}=useMutation({
//   mutationFn:()=> customFetch.post('/', 
//   {title:title,autor:autor,id:nanoid(),
// }  
//   ),

// });

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  return { editTask };
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.error('task deleted');
    },
  });
  return { deleteTask, deleteTaskLoading };
};
