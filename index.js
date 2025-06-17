const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: "Sample Task 1", description: "This is a sample task", completed: false },
    { id: 2, title: "Sample Task 2", description: "Another sample task", completed: true }
];
let nextId = 3; 

app.get('/', (req, res) => {
    res.status(200).send('Task API is running!');
});

app.get('/tasks', (req, res) => {
    try {
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

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

app.post('/tasks', (req, res) => {
    try {
        const { title, description, completed = false } = req.body;

        
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

      
        const newTask = {
            id: nextId++,
            title: title.trim(),
            description: description.trim(),
            completed: Boolean(completed)
        };

        
        tasks.push(newTask);

    
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


app.put('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const { title, description, completed } = req.body;

       
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

  
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


app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }

     
        tasks.splice(taskIndex, 1);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
