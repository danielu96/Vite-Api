import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import morgan from 'morgan';
import bearerToken from 'express-bearer-token';
const app = express();
import  jwt  from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
let taskList = [
  { id: nanoid(), title: 'do something important',author:"daniel",email:'daniel@wp.pl', isDone: false },
  { id: nanoid(), title: 'rest some',author:"PAUL",email:'paul@pp.pl', isDone: false },
  { id: nanoid(), title: 'clean office',author:"RAUL",email:'raul@wp.pl', isDone: true },
  { id: nanoid(), title: 'take a dog with some food',author:"JOHN",email:'john@jp.pl', isDone: false },
];
let jobs = [
  { jobId: 1,id: nanoid(), position: 'engin',jobLocation:"Montreal",company:"Samsung",jobType:'part-time',status:"interview" },
  { jobId: 2,id: nanoid(), position: 'monter',jobLocation:"Maiami",company:"Manta",jobType:'full-time',status:"pending" },
 { jobId: 3,id: nanoid(), position: 'kasier',jobLocation:"walia",company:"Unitra",jobType:'part-time',status:"interview" }
];
let userList = [
  { userId: 1,id: nanoid(), password: '123',name:"daniel",lastName:"Karka",location:"wasa",email:'daniel@wp.pl'},
  { userId: 1,id: nanoid(), password: 'pa213',name:"PAUL",email:'paul@pp.pl'},
  { userId: 1,id: nanoid(), password: 'r098',name:"RAUL",email:'raul@wp.pl'},
  { userId: 1,id: nanoid(), password: 'j456',name:"JOHN",email:'john@jp.pl'},
];
let   defaultStats = [
  {pending:20},
{interview:10},
{declines:22}
]
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
// app.use(bearerToken());
// app.use(jwt);
app.use(bearerToken({
  bodyKey: 'access_token',
  queryKey: 'access_token',
  headerKey: 'Bearer',
  reqKey: 'token',
  cookie: false, // by default is disabled
}));
// app.get('/', (req, res) => {
//   res.send('<h1>Hello From Server...</h1>');
// });
//-------------------------------------------------------------------------
// TASKS STARTS
app.get('/api/tasks', (req, res) => {
  res.json({ taskList });
});
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = taskList.find((task)=> task.id ===id);
  if (!task){
    return res.status(404).json({msg:`no task ${id}`});
  }
  res.status(200).json({task})
  // taskList = taskList.map((task) => {
  //   if (task.id === id) {
  //     return { task };
  //   }
//     return task;
//   });
//   res.json({ id });
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const { author } = req.body;
  const { email } = req.body;
  if (!title && !author && !email) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newTask = { id: nanoid(), title,author,email, isDone: true };
  taskList = [...taskList, newTask];
  res.json({ task: newTask });
});
app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body; 
  taskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, isDone };
    }
    return task;
  });

  res.json({ msg: 'task updated' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  taskList = taskList.filter((task) => task.id !== id);

  res.json({ msg: 'task removed' });
});
//-------------------------------------------------------------------------
// USERS STARTS
app.get('/api/users', (req, res) => {
  res.json({ userList});
});
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;   
const singleUser = userList.find(
  (user)=> user.id===Number(user.id)
  )
if(!singleUser){
  return res.status(404).send('not exist')
}
return res.json(id,singleUser)
})
  // userList = userList.find((user) => {
  //   if (user.id === id) {
  //     return { ...user};
  //   }
  //   return user;
  // });
//   res.json({ id,user});
// });
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
  // const data =[ user={ id: nanoid(), password,email }];
// data= jobs;
  // data = jobs.map((job,id) => {
  //    {
  //     return <div key={id} {...job }/>;
  //   }
  //   // return jobs;
  // });
  //  const {email,password}=req.body;
  const { name } = req.body;
  const { password } = req.body;
  const { email } = req.body;
  const user = { id: nanoid(), password,email,name };
  if (user) return res.status(200).json(`welcome from backend ${user.name}`)
 
  // // (!email && !password) return res.status(400).json({'message':'fill it'})
  else {
    return res.status(400).send(`fuck off ${email}`)
    // res.json({ jobs}) ;
   }
  // res.status(200).send(`welcone ${user}`)
  // const user={
  //   id:nanoid(),
  //   email:'daniel@wp.pl',
  //   password:'123',
  //   name:'danielko',
  // // token: bearerToken,

  // }
  // jwt.sign({user},'secretkey',(err,token)=>{
    
    // res.json({jobs,defaultStats})
  // })
  // res.json({ jobs,user,defaultStats}) ;
  //  ; 
//   if (user) return res.status(200).json(`welcome`)
//   else {
// return res.status(400).send(`fuck ${email}`)
//   }


}
)
;
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

  res.json({ msg: 'task removed' });
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
//-------------------------------------------------------------------------
// JOBS STARTS
app.get('/api/jobs', (req, res) => {
  res.json({ jobs});
});
app.get('/api/jobs/allJobs/getJobs', (req, res) => {
  res.json({ jobs}); 
});
app.get('/api/jobs/stats', (req, res) => { 
  res.json(defaultStats); 
});
app.delete('/api/jobs/:id', (req, res) => {
  const { id } = req.params;
  jobs = jobs.filter((job) => job.id !== id);
  res.json({ msg: 'job removed',jobs });
}); 
app.post('/api/jobs', (req, res) => {  
  const { position } = req.body;
  const { company } = req.body;
  const { jobLocation,jobType,status } = req.body;
  if ( !position && !company && !jobLocation) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newJob = { id: nanoid(), position,company,jobLocation,jobType,status };
  jobs = [...jobs, newJob];
  res.json({ job: newJob });
});
app.patch('/api/jobs/editJob', (req, res) => {  
  const { position } = req.body;
  const { company } = req.body;
  const { jobLocation,jobType,status } = req.body;
  if ( !position && !company && !jobLocation) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newJob = { id: nanoid(), position,company,jobLocation,jobType,status };
  jobs = [...jobs, newJob];
  res.json({ job: newJob });
});
//----------------------------------------------------------------------------

app.use((req, res) => res.status(404).send('Route does not exist'));

const port = process.env.PORT || 5000;

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp();
