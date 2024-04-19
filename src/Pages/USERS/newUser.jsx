// import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NewUserDetail } from "./newUserDetail";
// import Pagination from "../../Components/Pagination";
// import ReactPaginate from 'react-paginate';
const maxPostPage = 4;

async function fetchPosts(pageNum) {
  const response = await fetch(
     `http://localhost:5000/api/jobs?${pageNum}`
  );
  return response.json();
}

export function NewUser() {
  // const  userList = useSelector((state) => state.userList);
  // const [currentItems, setCurrentItems] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const itemsPerPage = 3;

  const queryClient = useQueryClient();

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) %
  //     userList.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // }; 


  // useEffect(() => {
  //   if (currentPage < maxPostPage) {
  //     const nextPage = currentPage + 1;
  //     queryClient.prefetchQuery(["users", nextPage], () =>
  //       fetchPosts(nextPage)
  //     );
  //   }
  // }, [currentPage, queryClient]);
  // useEffect(() => {    
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(data.userList.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(userList.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage
    
  // ]);


  useEffect(() => {
  const nextPage = currentPage + 1;
  if (nextPage <= maxPostPage) {
    queryClient.prefetchQuery(["users", nextPage], () => fetchPosts(nextPage));
  }
}, [currentPage, queryClient]);

  const { data, isError, error, isLoading } = useQuery(
    ["users", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 200,
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Sorry</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
    <div className="-mt-4 grid grid-cols-2 mx-5 border-solid border-2 w-auto">
      <div className="ml-20 ">
   <h1 className="mb-5 font-bold"   >USERS</h1> 
      <ul className="cursor-pointer">
        {data.jobs.map((user) => (
          <li className="hover:font-medium hover:text-primary"
            key={user.id}
          
            onClick={() => setSelectedUser(user)}
          >
          name:  {user.jobType}     
          </li>
          
        ))}
      </ul>
      
      <div className="pages mx-auto my-3">
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

      </div>
      {/* <Pagination/> */}
      </div>
      {/* <div style={{paddingLeft:'0rem'}}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageLinkClassName={"page-num"}
        previousLinkClassName={"page-num"}
        nextLinkClassName={"page-num"}
        disabledClassName={"disabled"}
        activeClassName={"active"}

      />
      </div> */}
     
      {selectedUser && <NewUserDetail user={selectedUser} />}
      </div>
    </>
  );
}