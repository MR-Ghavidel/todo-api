const mongoose = require('mongoose');
const redisClient = require('../config/redisClient');
const cacheKey = 'allTodos';

module.exports = (Todo) => {
    return {
        getAllTodos: async (req, res) => {
            try {
                const cachedData = await redisClient.get(cacheKey);

                if (cachedData) {
                    console.log('✅ Serving from cache!');
                    return res.status(200).json(JSON.parse(cachedData));
                }

                console.log('❌ Serving from database...');
                const todos = await Todo.find();
                await redisClient.setEx(cacheKey, 3600, JSON.stringify(todos));

                res.status(200).json(todos);

            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        },

        createTodo: async (req, res) => {
            if (!req.body.task || req.body.task.trim() === '') {
                return res.status(400).json({ message: 'Task field is required and cannot be empty.' });
            }
            try {
                const newTodo = await Todo.create({
                    task: req.body.task,
                });

                await redisClient.del(cacheKey);
                console.log(`🧹 Cache cleared for key: ${cacheKey}`);

                res.status(201).json(newTodo);
            } catch (error) {
                console.error("Error creating todo:", error);
                res.status(500).json({ message: 'An unexpected error occurred on the server.' });
            }
        },

        getTodoById: async (req, res) => {
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
        },

        updateTodo: async (req, res) => {
            try {
                const { id } = req.params;
                const { task, completed } = req.body;
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(404).json({ message: 'Todo not found' });
                }
                if (task === undefined || completed === undefined) {
                    return res.status(400).json({ message: 'Both task and completed fields are required.' });
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

                await redisClient.del(cacheKey);
                console.log(`🧹 Cache cleared for key: ${cacheKey}`);

                res.json(updatedTodo);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        },

        deleteTodo: async (req, res) => {
            try {
                const { id } = req.params;
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(404).json({ message: 'Todo not found' });
                }
                const deletedTodo = await Todo.findByIdAndDelete(id);
                if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });

                await redisClient.del(cacheKey);
                console.log(`🧹 Cache cleared for key: ${cacheKey}`);

                res.status(204).send();
            } catch (error) {
                res.status(500).json({ message: 'Server error while deleting todo.' });
            }
        }
    };
};