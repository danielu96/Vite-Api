import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './Pages/FEATURES/USER/ALLJOBS/JOB/JobSlice';

import userSlice from './Pages/FEATURES/USER/userSlice';
import allJobsSlice from './Pages/FEATURES/USER/ALLJOBS/AllJobsSlice';


export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});