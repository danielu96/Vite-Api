import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import {redirect} from 'react-router-dom';
// import customFetch from './utils';



const NewsletterList = () => {
  const {data}=useLoaderData();
  console.log(data.totalMessages )
  
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
