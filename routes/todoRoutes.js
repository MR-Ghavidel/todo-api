const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');
const todoControllerFactory = require('../controllers/todoController');
const todoController = todoControllerFactory(Todo);


router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);


module.exports = router;