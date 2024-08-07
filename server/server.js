import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import mongoose from "mongoose";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import bearerToken from 'express-bearer-token';

const app = express();

import  userList  from '../src/Mocks/mockData.js';
import newsletterRouter from './routes/newsletterRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js'
import jobsRouter from './routes/jobsRouter.js'
import appointmentRouter from './routes/appointmentRouter.js'
import visitRouter from './routes/visitRouter.js'
import ExpressMongoSanitize from "express-mongo-sanitize";



import errorHandlerMiddleware from '../server/middleware/errorHandlerMiddleware.js';
import {authenticateUser} from '../server/middleware/authMiddleware.js';



import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, 'tasks.json');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const readTasksFromFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};
const writeTasksToFile = async (tasks) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
};

let taskList = await readTasksFromFile();

// import  jwt  from 'jsonwebtoken';


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use (helmet());
app.use (ExpressMongoSanitize());
// app.use(bearerToken({
//   bodyKey: 'access_token',
//   queryKey: 'access_token',
//   headerKey: 'Bearer',
//   reqKey: 'token',
//   cookie: false, // by default is disabled
// }));

app.use('/api/v1/auth',authRouter);


//------------------NEWSLETTER------------------------

app.use('/api/v1/newsletter', authenticateUser, newsletterRouter);

//------------APPOINTMENTS----------------------------

app.use('/api/v1/appointments',authenticateUser, appointmentRouter);

//------------VISITS----------------------------

app.use('/api/visits',visitRouter);



//----------------- TASKS -----------------------------

app.get('/api/tasks',async (req, res) => {
  await readTasksFromFile(taskList);
  res.json({ taskList });
});
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = taskList.find((task)=> task.id ===id);
  if (!task){
    return res.status(404).json({msg:`no task ${id}`});
  }
  res.status(200).json({task})
});

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  const { author } = req.body;
  const { email } = req.body;
  const { date } = req.body;
  if (!title && !author && !email && !date) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newTask = { id: nanoid(), title,author,email,date, isDone: false };
  taskList = [...taskList, newTask];
  await writeTasksToFile(taskList);
  res.json({ task: newTask , msg: 'sent successfully'});
});
app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body; 
  taskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, isDone };
    }    
    return task;
  });
  await writeTasksToFile(taskList);
  res.json({ msg: 'task updated' });
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  taskList = taskList.filter((task) => task.id !== id);
  await writeTasksToFile(taskList);
  res.json({ msg: 'task removed' });
});
// ------------------USERS -----------------------------
app.use('/api/users', userRouter);


app.post('/api/users', (req, res) => {
  const { name } = req.body;
  const { password } = req.body;
  const { email } = req.body;
  if (!name && !password && !email) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newUser = { id: nanoid(), password,name,email };
  userList = [...userList, newUser];
  res.json({ user: newUser });
});
app.patch('/api/users/auth/updateUser', (req, res) => {
  const { name } = req.body;
  const { lastName} = req.body;
  const { email } = req.body;
  const { location } = req.body;
  if (!name && !email && !lastName && !location) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newUser = { id: nanoid(), name,lastName,email,location };
  userList = [...userList, newUser];
  res.json({ user: newUser });
});
app.post('/api/users/auth/login', (req, res) => {  
  const { name } = req.body;
  const { password } = req.body;
  const { email } = req.body;
  const user = { id: nanoid(), password,email,name };
  if (user) return res.status(200).json(`welcome from backend ${user.name}`)
    else {
    return res.status(400).send(`fuck off ${email}`)
    // res.json({ jobs}) ;
   }
  }
);
app.post('/api/users/auth/register', (req, res) => {
  
  const { name } = req.body;
  const { password } = req.body;
  const { email } = req.body;
  // const { token } = req.body;
  if ( !password && !email && !name) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newUser = { id: nanoid(), password,email,name };
  const token= jwt.sign({newUser},'secretkey',{expiresIn:'1h'}); 
  newUser.token =token;
  userList = [...userList, newUser];
 
  // jwt.sign({newUser},'secretkey',(err,token)=>{
  //   res.json({user: newUser , token})
  // })
  res.json({ user: newUser,token});
  // res.send('Token '+req.token);
}); 
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userList = userList.filter((user) => user.id !== id);

  res.json({ msg: 'user removed' });
});
app.patch('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body; 
  userList = userList.map((user) => {
    if (user.id === id) {
      return { ...user, name};
    }
    return user;
  });
  res.json({ msg: 'task updated' });
});
//---------------------------JOBS ---------------------------------------
app.use('/api/jobs',jobsRouter);
//----------------------------------------------------------------------------

app.use((req, res) => res.status(404).send('Route does not exist'));
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port ,()=>{
      console.log(`server running yes... on PORTO ${port}`);
  });

} catch (error) {
  console.log(error);
  process.exit(1);
}

// const startApp = () => {
//   try {
//     app.listen(port, () => {
//       console.log(`Server is listening on port ${port}...`);
//     });
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// startApp();
