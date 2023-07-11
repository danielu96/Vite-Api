import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
const app = express();
import morgan from 'morgan';

let taskList = [
  { id: nanoid(), title: 'do something impportant',autor:"DAN",email:'dan@wp.pl', isDone: false },
  { id: nanoid(), title: 'rest some',autor:"PAUL",email:'paul@pp.pl', isDone: false },
  { id: nanoid(), title: 'clean office',autor:"RAUL",email:'raul@wp.pl', isDone: true },
  { id: nanoid(), title: 'take a dog with some food',autor:"JOHN",email:'john@jp.pl', isDone: false },
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

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const { autor } = req.body;
  const { email } = req.body;
  if (!title && !autor && !email) {
    res.status(400).json({ msg: 'please provide valuesa' });
    return;
  }
  const newTask = { id: nanoid(), title,autor,email, isDone: false };
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
