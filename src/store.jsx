import React from 'react'
import { configureStore, createReducer } from '@reduxjs/toolkit'
import userReducer from './Slices/userReducer';

const store = configureStore({
  reducer: {
    users: userReducer,
   

  },
});

export default store