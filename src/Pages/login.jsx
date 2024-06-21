import { FormInput,SubmitBtn } from '../components';
import { Form, Link,useNavigate,redirect } from 'react-router-dom';
import { usersFetch } from '../UTILS/axios';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { customFetch } from '../UTILS/axios';



export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/auth/login', data);

      store.dispatch(loginUser(response.data));
      toast.success(response?.data?.msg);
      return redirect('/');
    } catch (error) {
      // console.log(error);    
        // 'please double check your credentials';       
      toast.error(
        error?.response?.data?.msg ||
        'please double check your credentials'
        );
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/testUser', {       
        identifier: 'demo@dem.dm',
        password: '12345678',
      });
      dispatch(loginUser(response.data));
      toast.success(response?.data?.msg);
      navigate('/');
    } catch (error) {
      console.log(error);
      // const errorMessage =
      //   error?.response?.data?.message
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput
          type='email'
          label='email'
          name='identifier'
          // defaultValue='aga@aga.ag'
        
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          // defaultValue='12345678'
          
        />
        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button type='button' className='btn btn-secondary btn-block'
         onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className='text-center'>
          Not a member yet?
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;