import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NewUserDetail } from "./newUserDetail";


const maxPostPage = 3;

async function fetchPosts(pageNum) { 
  const response = await fetch(
    `http://localhost:5000/api/jobs?page=${pageNum}`
     );
  return response.json();
}

export function NewUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState([]);
  const queryClient = useQueryClient();
  const [autoPageSwitch, setAutoPageSwitch] = useState(false);  

  const { data, isError, error, isLoading } = useQuery(
    ["users", currentPage],
    () => fetchPosts(currentPage),
    console.log(currentPage),
    {
      staleTime: 200,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const nextPage = currentPage + 1;
    if (nextPage <= maxPostPage && autoPageSwitch) {
      // Prefetch next page and update current page after a delay
      queryClient.prefetchQuery(["users", nextPage], () => fetchPosts(nextPage));
      setTimeout(() => setCurrentPage(currentPage + 1), 2000); // Adjust delay as needed
    }

    // Re-render when data or autoPageSwitch changes
  }, [currentPage, queryClient, data, autoPageSwitch]);

  useEffect(() => {
    const nextPage = currentPage + 1;
    if (nextPage <= maxPostPage) {
      queryClient.prefetchQuery(["users", nextPage], () => fetchPosts(nextPage));
    }

    // Re-render the component when data for the next page is fetched
    if (data && data.jobs && data.jobs.length > 0) {
      setCurrentPage(currentPage);
    }
  }, [currentPage, queryClient, data]);

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
      <div className="-mt-4 mx-5 grid md:grid-cols-2 lg:grid-cols-2 border-solid border-2 w-auto">
        <div className="ml-20">
          <h1 className="mb-5 font-bold">USERS</h1>
          <ul className="cursor-pointer">
            {data && data.jobs && data.jobs.map((user) => (
              <li
                className="hover:font-medium hover:text-primary"
                key={user.id}
                onClick={() => setSelectedUser(user)}
              >
                name: {user.name}
              </li>
            ))}
          </ul>
         
          <PaginationControls
            currentPage={currentPage}
            maxPostPage={maxPostPage}
            setCurrentPage={setCurrentPage}
          />

          <div className="pages mx-auto my-3">
            <label className="ml-3">
              Auto Switch:
              <input
                type="checkbox"
                checked={autoPageSwitch}
                onChange={(e) => setAutoPageSwitch(e.target.checked)}
              />
            </label>
          </div>
        </div>

        {selectedUser && <NewUserDetail user={selectedUser} />}
      </div>
    </>
  );
}

const PaginationControls = ({ currentPage, maxPostPage, setCurrentPage }) => (
  <div className="pages mx-auto my-3">
    <button
      disabled={currentPage <= 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Prev
    </button>
    <span className="font-bold"> {currentPage} </span>
    <button
      disabled={currentPage >= maxPostPage}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </button>
  </div>
);
