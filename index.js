const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory task storage
let tasks = [
    { id: 1, title: "Sample Task 1", description: "This is a sample task", completed: false },
    { id: 2, title: "Sample Task 2", description: "Another sample task", completed: true }
];
let nextId = 3; // To generate unique IDs for new tasks

// Test route
app.get('/', (req, res) => {
    res.status(200).send('Task API is running!');
});

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    try {
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /tasks/:id - Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = tasks.find(t => t.id === taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    try {
        const { title, description, completed = false } = req.body;

        // Validation: Check if title and description are provided
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        // Create new task
        const newTask = {
            id: nextId++,
            title: title.trim(),
            description: description.trim(),
            completed: Boolean(completed)
        };

        // Add to tasks array
        tasks.push(newTask);

        // Return the created task
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT /tasks/:id - Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const { title, description, completed } = req.body;

        // Validation: Check if title and description are provided
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        // Update the task
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: title.trim(),
            description: description.trim(),
            completed: completed !== undefined ? Boolean(completed) : tasks[taskIndex].completed
        };

        res.status(200).json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE /tasks/:id - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Remove the task from the array
        tasks.splice(taskIndex, 1);

        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});