import React from 'react'
import { jobsFetch,tasksFetch,usersFetch } from '../UTILS/axios';
import { useLoaderData } from 'react-router';
const TasksQuery = {
    queryKey: ['myTasks'],
    queryFn: () => tasksFetch.get('/'),
  };
  const UsersQuery = {
    queryKey: ['allUsers'],
    queryFn: () => usersFetch.get('/users'),
  };
  const JobsQuery = {
    queryKey: ['allJobs'],
    queryFn: () => jobsFetch.get('/'),
  };
  
  export const loader = (queryClient) => async () => {
    const tasksResponse = await queryClient.ensureQueryData(TasksQuery);
    const tasksData = tasksResponse.data.taskList;
  
    const usersResponse = await queryClient.ensureQueryData(UsersQuery);
    const usersData = usersResponse.data.data;
  
    const jobsResponse = await queryClient.ensureQueryData(JobsQuery);
    const jobsData = jobsResponse.data.jobs;
  
    // Process and combine tasksData and usersData
    // const combinedData = { ...tasksData, ...usersData };
  
    return { tasksData, usersData,jobsData };
  };

const Stat = () => {
    const {jobsData,tasksData, usersData,}= useLoaderData()
    console.log(jobsData)
  return (
    <>   
    <div className='pt-12 grid  md:grid-cols-3 lg:grid-cols-3'
    // style={{ display:"flex", gap:"3rem",padding:"2rem",textAlign: 'center', marginTop: '-6rem' }}
    >   
    <div className="stat place-items-center">
      <div className="stat-title font-bold text-primary" >New jobs</div>
      <div className='font-bold' >{jobsData.length}      
        </div>
      <div className="stat-desc text-primary">From January</div>
    </div>
    <div className="stat place-items-center" >
      <div className="stat-title font-bold text-secondary">Users</div>
      <div className='font-bold'>  {usersData.length} 
                </div>
      <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
    </div>  
    <div className="stat place-items-center" >
      <div className="stat-title font-bold text-primary"> Tasks</div>
      <div className='font-bold'>{tasksData.length}       
        </div>
      <div className="stat-desc text-primary">↘︎ 90 (14%)</div>
    </div>   
    </div>
    </>
  )
}

export default Stat