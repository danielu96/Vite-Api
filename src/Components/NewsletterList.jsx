import { useFetchNewsletter } from './reactQueryCustomHooks';

const NewsletterList = () => {
  
  const { isLoading, isError, data } = useFetchNewsletter();
console.log(data)
  if (isLoading) {
    return     <p className='flex mt-8 justify-center font-extrabold text-4xl'>Loading...</p>       
  }
  if (isError) {
    return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
  }
  return (
    <> 
    <div className='mt-8  mx-8 overflow-y-auto ' >
    <div className='flex justify-center font-medium'>Newsletter: {data.newsletterList.length}</div>
        <table className='w-full table '  >
        <thead >
            <tr className='border-current'>               
              <th className='hidden sm:block'>Email</th>                          
            </tr>
          </thead>
     <tbody>
        {data.newsletterList.map((address) => {  
                     return (                     
                    <tr  key={address.id}>                                   
         <td className='hidden sm:block'>{address.email}</td>                
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
