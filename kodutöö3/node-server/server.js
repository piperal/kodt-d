const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const tasksFile = process.env.TASKS_FILE

const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const normalizeTasks = (data) => {
    if (Array.isArray(data)) {
        return data;
    }

    if (data && Array.isArray(data.tasks)) {
        return data.tasks;
    }

    return [];
};


//See API endpoint toob andmed tasks.json failist esile ja saadab need frontendi
app.get('/tasks', (req, res) => {
    const status = req.query.completed;

    fs.readFile(tasksFile, 'utf8', (err, data) => {
        if (err) {
            return next(createError(500, 'Could not read task file'));
        }

        try {
            const tasks = normalizeTasks(JSON.parse(data));
            if (!Array.isArray(tasks)) {
                return next(createError(400, 'Task file must contain an array'));
            }

            if (status === undefined) {
                return res.json(tasks);
            }

            const isCompleted = status === 'true';
            const filteredTasks = tasks.filter(task => task.completed === isCompleted);

            res.json(filteredTasks);
        } catch (error) {
            console.error(error);
            return next(createError(500, 'Invalid json in task file'));
        }
    });
});

//See API endpoint avab tasks.json faili, võtab taskid välja ja lükkab uue taski arrayse ja siis kirjutab vana faili üle
app.post('/tasks/add', (req, res, next) => {
    const task = req.body;

    if (!task || !task.title || typeof task.title !== 'string' || !task.title.trim()) {
        return next(createError(400, 'Task title is required'));
    }

    fs.readFile(tasksFile, 'utf8', (err, data) => {
        if (err) {
            return next(createError(500, 'Could not read tasks file'));
        }

        try {
            const parsed = JSON.parse(data);
            const tasks = normalizeTasks(parsed);
            tasks.push(task);

            const payload = { tasks };

            fs.writeFile(tasksFile, JSON.stringify(payload), (writeErr) => {
                if (writeErr) {
                    return next(createError(500, 'Could not write tasks file'));
                }

                res.status(201).json({ message: 'Task added', task });
            });
        } catch (parseErr) {
            console.error(parseErr);
            next(createError(500, 'Invalid JSON in tasks file'));
        }
    });
});

app.get('/tasks/completed', (req, res, next) => {
    fs.readFile(tasksFile, 'utf8', (err, data) => {
        if (err) {
            return next(createError(500, 'Could not read task file'));
        }

        try {
            const tasks = normalizeTasks(JSON.parse(data));
            const completedTasks = tasks.filter(task => task.completed);

            res.json(completedTasks);
        } catch (parseErr) {
            console.error(parseErr);
            return next(createError(500, 'Invalid json in task file'));
        }
    });
});

app.get('/tasks/:id', (req, res, next) => {
    const id = Number(req.params.id);

    fs.readFile(tasksFile, 'utf8', (err, data) => {
        if (err) {
            return next(createError(500, 'Could not read task file'));
        }

        try {
            const tasks = normalizeTasks(JSON.parse(data));
            const task = tasks.find(task => Number(task.id) === id);

            if (!task) {
                return next(createError(404, 'Task not found'));
            }

            res.json(task);
        } catch (parseErr) {
            console.error(parseErr);
            return next(createError(500, 'Invalid json in task file'));
        }
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.delete('/tasks/delete/:id', (req, res, next) => {
    const id = Number(req.params.id);

    fs.readFile(tasksFile, 'utf8', (err, data) => {
        if (err) {
            return next(createError(500, 'Could not read task file'));
        }

        try {
            const parsed = JSON.parse(data);
            const tasks = normalizeTasks(parsed);
            const originalLength = tasks.length;
            const updatedTasks = tasks.filter(task => Number(task.id) !== id);

            if (updatedTasks.length === originalLength) {
                return next(createError(404, 'Task not found'));
            }

            const payload = { tasks: updatedTasks };

            fs.writeFile(tasksFile, JSON.stringify(payload), (writeErr) => {
                if (writeErr) {
                    return next(createError(500, 'Could not write task file'));
                }

                res.status(200).json({ message: 'Task deleted' });
            });
        } catch (parseErr) {
            console.error(parseErr);
            return next(createError(500, 'Invalid json in task file'));
        }
    });
});

app.patch('/tasks/update/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const body = req.body

    fs.readFile(tasksFile, 'utf8', (err, data) => {
        if (err) {
            return next(createError(500, 'Could not read tasks file'));
        }

        try {
            const parsed = JSON.parse(data);
            const tasks = normalizeTasks(parsed);
            const taskToUpdate = tasks.find(item => item.id == id)

            if (!taskToUpdate) {
                return next(createError(404, 'Task not found'));
            }

            if (!body.title || body.title == '') {
                return next(createError(400, 'Cant update with no title'));
            }

            taskToUpdate.title = body.title

            const payload = { tasks: tasks };

            fs.writeFile(tasksFile, JSON.stringify(payload), (writeErr) => {
                if (writeErr) {
                    return next(createError(500, 'Could not write tasks file'));
                }

                res.status(200).json({ message: 'Task updated' });
            });
        } catch (parseErr) {
            console.error(parseErr);
            return next(createError(500, 'Invalid JSON in tasks file'));
        }
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(`${req.method} ${req.url} - ${err.message}`);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const message = statusCode === 400 ? err.message : 'Internal server error';

    res.status(statusCode).json({ error: message });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://127.0.0.1:${port}`);
    });
}

module.exports = app;