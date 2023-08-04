import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customFetchUsers from './usersUtils';

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
  
    const { mutate: deleteUser, isLoading: deleteUserLoading } = useMutation({
      mutationFn: (userId) => {
        return customFetchUsers.delete(`/${userId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
    return { deleteUser, deleteUserLoading };
  };
  export const useEditUser = () => {
    const queryClient = useQueryClient();
  
    const { mutate: editUser } = useMutation({
      mutationFn: ({ userId, name }) => {
        return customFetchUsers.patch(`/${userId}`, { name});
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
    return { editUser };
  };