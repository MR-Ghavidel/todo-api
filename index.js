//
// 1.
const express = require('express');

// 2.
const app = express();
const PORT = 3000;

// 3.
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to our To-Do API.');
});

// 4.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});