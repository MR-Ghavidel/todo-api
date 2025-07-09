
const express = require('express');
const Todo = require('./models/Todo');

const app = express();
app.use(express.json());
const PORT = 3000;

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const todos = [
  { id: 1, task: 'Learn Node.js basics', completed: true },
  { id: 2, task: 'Build a simple API', completed: false },
  { id: 3, task: 'Connect to a database', completed: false }
];

// GET reqs
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to our To-Do API.');
});

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await Todo.find({});
    res.json(allTodos);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching todos' });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching todo' });
  }
});

// POST req
app.post('/todos', async (req, res) => {
  try {

    if (!req.body.task) {
      return res.status(400).json({ error: 'Task is required' });
    }

    const newTodo = await Todo.create({
      task: req.body.task,
    });

    res.status(201).json(newTodo);

  } catch (error) {
    res.status(500).json({ error: 'Server error while creating todo' });
  }
});

// PUT req
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (typeof task !== 'string' || typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Invalid data provided.' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating todo' });
  }
});

// DELETE req
app.delete('/todos/:id', (req, res) => {

  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).send('Todo not found!');
  }

  todos.splice(todoIndex, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});