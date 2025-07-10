const mongoose = require('mongoose');
const Todo = require('../models/Todo');


exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTodo = async (req, res) => {
    if (!req.body.task || req.body.task.trim() === '') {
        return res.status(400).json({ message: 'Task field is required and cannot be empty.' });
    }

    try {
        const newTodo = await Todo.create({
            task: req.body.task,
        });

        res.status(201).json(newTodo);

    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ message: 'An unexpected error occurred on the server.' });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (typeof task !== 'string' || typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Invalid data provided.' });
        }
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task, completed },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};