import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NewUserDetail } from "./newUserDetail";

const maxPostPage = 5;

async function fetchPosts(pageNum) {
  const response = await fetch(
     `http://localhost:5000/api/users?${pageNum}`
  );
  return response.json();
}

export function NewUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["users", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  const { data, isError, error, isLoading } = useQuery(
    ["users", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
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
   <h1>USERS</h1> 
      <ul>
        {data.userList.map((user) => (
          <li
            key={user.id}
            className="post-title"
            onClick={() => setSelectedUser(user)}
          >
          name:  {user.name},<br/>       
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedUser && <NewUserDetail user={selectedUser} />}
    </>
  );
}