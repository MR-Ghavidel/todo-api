require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(error => console.error('Connection error:', error));

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World! Welcome to our To-Do API.');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});