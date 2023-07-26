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
    res.status(400).json({ msg: 'please provide VALUE' });
    return;
  }
  const newTask = { id: nanoid(), title,author,email, isDone: false };
  taskList = [...taskList, newTask];
  res.json({ task: newTask });
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
