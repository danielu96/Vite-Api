import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';
// import { clearCart } from '../features/cart/cartSlice';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    navigate('/');
    dispatch(logoutUser());  
    // dispatch(clearCart());  
    queryClient.removeQueries();
    toast.success('Logged out success');
  };
  return (
    <header className=' bg-neutral py-2 text-neutral-content '>
    <div className='align-element flex justify-center sm:justify-end '>
      {user ? (
        <div className='flex gap-x-2 sm:gap-x-8 items-center'>
          <p className='text-xs sm:text-sm'>Hello, {user.name}</p>
          <button
            className='btn btn-xs btn-outline btn-primary mr-2'
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      ) : (
        <div className='flex gap-x-6 justify-center items-center mr-4'>
          <Link to='/login' className='link link-hover text-xs sm:text-sm'>
            Sign in / Guest
          </Link>       
        </div>
      )}
    </div>
  </header>
  );
};
export default Header;