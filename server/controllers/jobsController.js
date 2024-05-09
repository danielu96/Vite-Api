import { nanoid } from "nanoid";

import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, '../MockData/jobs.json');

const readJobsFromFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};
const writeJobsToFile = async (jobs) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(jobs));
  } catch (error) {
    console.error(error);
  }
};

let jobs = await readJobsFromFile();

export const getAllJobs = async  (req, res) => {
    const page = Number(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 3;
     const offset = parseInt(req.query.offset) || (page - 1) * limit;
     const totalJobs = jobs.length;
    
     const jobsSubset = jobs.slice(offset, offset + limit); 
    
     let meta = {
    "pagination": {
    "page": Number(req.query.page) || 1,
     "pageSize": limit,
     "pageCount": Math.ceil(totalJobs / limit),
     "total":totalJobs  , 
    },}
    await readJobsFromFile(jobs);
    res.json({ jobs: jobsSubset , totalJobs,meta });
    };
    export const deleteJob = async  (req, res) => {
        const { id } = req.params;
     jobs = jobs.filter((job) => job.id !== id);
        await writeJobsToFile(jobs);
        res.json({ msg: 'job removed' });
      }; 
      export const AddJob = async    (req, res) => {  
        const { position } = req.body;
        const { company } = req.body;
        const { jobLocation,jobType,status } = req.body;
        const { name,comment } = req.body;
        if ( !position && !company && !jobLocation
        ) {
          res.status(400).json({ msg: 'please provide value' });
          return;
        }
        const newJob = { id: nanoid(), position,company,jobType,status,name,comment};       
        jobs = [...jobs, newJob];
        await writeJobsToFile(jobs);
        res.json({ job: newJob });
      };

      export const EditJob = async (req, res) => {
        // 1. Extract job data from request body
        const { position, company, jobLocation, jobType, status, name, comment } = req.body;
      
        // 2. Validate input (same as original code)
        if (!position && !company && !jobLocation) {
          res.status(400).json({ msg: 'please provide value' });
          return;
        }
      
        // 3. Find the existing job to update
        const jobId = req.params.id; // Assuming the job ID is in the request URL path
        const existingJobIndex = jobs.findIndex((job) => job.id === jobId);
      
        // 4. Handle job not found (improved error handling)
        if (existingJobIndex === -1) {
          res.status(404).json({ msg: 'Job not found' });
          return;
        }
      
        // 5. Create the updated job object
        const updatedJob = {
          id: jobId, // Maintain the original ID
          position,
          company,
          jobLocation,
          jobType,
          status,
          name,
          comment,
        };
      
        // 6. Update the jobs array (efficient in-place update)
        jobs[existingJobIndex] = updatedJob;
      
        // 7. Persist the updated jobs data to file (same as original code)
        await writeJobsToFile(jobs);
      
        // 8. Send a successful response with the updated job
        res.json({ job: updatedJob, msg: 'Job updated successfully' });
      };

   