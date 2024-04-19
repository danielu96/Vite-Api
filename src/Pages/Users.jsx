import React from 'react'
import UserList from '../Components/UserList'
import { useLoaderData } from 'react-router-dom';
// import axios from 'axios';
import Pagination from '../Components/Pagination'
import { usersFetch } from '../UTILS/axios';
const url = '/users';
// import { useEffect, useState } from "react";
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// async function fetchPosts(pageNum) {
//   const response = await fetch(
//      `http://localhost:5000/api/users?${pageNum}`
//   );
//   return response.json();
// }


// const maxPostPage = 4;
// const localData = 
// 'http://localhost:5000/api/users' ;

// export const loader = async ()=>{    
//     const response= await axios.get   (`${localData}`)         ;
//     console.log(response)
//     return {data:response.data.data,meta:response.data.meta}
//   };
const allUsersQuery = (queryParams) => {
  const { page } =
    queryParams;

  return {
    queryKey: [
      'users',     
      page ?? 1,
    ],
    queryFn: () =>
    usersFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // const response = await customFetch(url,{params});
    const response = await queryClient.ensureQueryData(
      allUsersQuery(params)
    );

    const data = response.data.data;
    const meta = response.data.meta;

    return { data, meta};
  };




 
const Users = () => {
  // const queryClient = useQueryClient();
  // const [currentPage, setCurrentPage] = useState(1);
    const {data}=useLoaderData();
    const {meta}=useLoaderData();
    console.log(data);
    // useEffect(() => {
    //   const nextPage = currentPage + 1;
    //   if (nextPage <= maxPostPage) {
    //     queryClient.prefetchQuery(["users", nextPage], () => fetchPosts(nextPage));
    //   }
    // }, [currentPage, queryClient]);
    
    //   const { data, isError, error, isLoading } = useQuery(
    //     ["users", currentPage],
    //     () => fetchPosts(currentPage),
    //     {
    //       staleTime: 200,
    //       keepPreviousData: true,
    //     }
    //   );
    //   if (isLoading) return <h3>Loading...</h3>;
    //   if (isError)
    //     return (
    //       <>
    //         <h3>Sorry</h3>
    //         <p>{error.toString()}</p>
    //       </>
    //     );




  return (
    <>
    <div className='grid justify-center'>
        <UserList data={data} meta={meta} />
    </div>   
    <Pagination />
    {/* <div className="flex justify-center mt-5 py-2 gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Prev
        </button>
        <span className="font-bold"> {currentPage} </span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
           Next
        </button>

      </div>              */}
    </>
  )
}

export default Users