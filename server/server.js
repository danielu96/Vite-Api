import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import morgan from 'morgan';

const app = express();


let taskList = [
  { id: nanoid(), title: 'do something important',author:"DAN",email:'dan@wp.pl', isDone: false },
  { id: nanoid(), title: 'rest some',author:"PAUL",email:'paul@pp.pl', isDone: false },
  { id: nanoid(), title: 'clean office',author:"RAUL",email:'raul@wp.pl', isDone: true },
  { id: nanoid(), title: 'take a dog with some food',author:"JOHN",email:'john@jp.pl', isDone: false },
];
let userList = [
  { id: nanoid(), password: '123d',name:"DAN",email:'dan@wp.pl'},
  { id: nanoid(), password: 'pa213',name:"PAUL",email:'paul@pp.pl'},
  { id: nanoid(), password: 'r098',name:"RAUL",email:'raul@wp.pl'},
  { id: nanoid(), password: 'j456',name:"JOHN",email:'john@jp.pl'},
];

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>Hello From Server...</h1>');
});

app.get('/api/tasks', (req, res) => {
  res.json({ taskList });
});
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;
  // const { title } = req.body;
  const { author } = req.body;
  // const { email} = req.body;

  taskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task , isDone,author};
    }
    return task;
  });
  res.json({ id,author });
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const { author } = req.body;
  const { email } = req.body;
  if (!title && !author && !email) {
    res.status(400).json({ msg: 'please provide value' });
    return;
  }
  const newTask = { id: nanoid(), title,author,email, isDone: false };
  taskList = [...taskList, newTask];
  res.json({ task: newTask });
});
app.get('/api/users', (req, res) => {
  res.json({ userList });
});
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params; 
  // const { name } = req.body;
  // const { password } = req.body;
  // const { email} = req.body;

  userList = userList.map((user) => {
    if (user.id === id) {
      return { ...user};
    }
    return user;
  });
  res.json({ id,user});
});
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

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;
  const { title } = req.body;
  const { author } = req.body;
  taskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, isDone,title,author };
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
