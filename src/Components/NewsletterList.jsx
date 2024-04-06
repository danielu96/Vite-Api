import { useLoaderData } from 'react-router-dom';
import { useFetchNewsletter } from './reactQueryCustomHooks';
import { toast } from 'react-toastify';
import {redirect} from 'react-router-dom';
// import customFetch from './utils';
import { newsletterFetch } from '../UTILS/axios';

export const newsletterQuery = (params) => {
  return {
    queryKey: [
      'newsletter'          
    ],
    queryFn: () =>
    newsletterFetch.get('/', { params }),      
  };  
};


export const loader =
  (queryClient) =>
  async ({ request }) => {
   
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        newsletterQuery(params)
      );

      return {
        data: response.data,
        totalMessages:response.data.totalMessages        
      };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error accessing your contact';

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect('/newsletter');
      return null;
    }
  };

const NewsletterList = () => {
  const {data}=useLoaderData();
  console.log(data.totalMessages )
  
//   const { isLoading, isError, data } = useFetchNewsletter();
// console.log(data)
//   if (isLoading) {
//     return     <p className='flex mt-8 justify-center font-extrabold text-4xl'>Loading...</p>       
//   }
//   if (isError) {
//     return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
//   }
  return (
    <> 
    <div className='mt-8  mx-8 overflow-y-auto ' >
    <div className='flex justify-center font-medium'>It was: {data.data.length} address</div>
   
        <table className='w-full table '  >
        <thead >
            <tr className='border-current'>               
              <th className='hidden sm:block'>Email</th>                          
            </tr>
          </thead>
     <tbody>
        {data.data.map((address) => {  
                     return (                     
                    <tr  key={address.id}>                                   
         <td className='hidden sm:block'>{address.email}</td>  
         <td className='hidden sm:block'>{address.createdAt }</td>              
                   </tr>       
          )            
        })}
            </tbody>
            </table>
        </div>  
           </>
  );
};
export default NewsletterList;
