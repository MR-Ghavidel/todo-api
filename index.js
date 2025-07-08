
const express = require('express');

const app = express();
const PORT = 3000;

// Mock Database
const todos = [
  { id: 1, task: 'Learn Node.js basics', completed: true },
  { id: 2, task: 'Build a simple API', completed: false },
  { id: 3, task: 'Connect to a database', completed: false }
];

app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to our To-Do API.');
});

// GET - Read all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});