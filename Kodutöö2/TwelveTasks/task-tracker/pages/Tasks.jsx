import { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import SecTitle from "../components/SecTitle"
import { getTasks } from '../services/taskApi';

function Tasks() {
    const [filter, setFilter] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function loadTasks() {
            try {
                setLoading(true);
                setError('');

                const data = await getTasks();

                if (!cancelled) {
                    setTasks(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadTasks();

        return () => {
            cancelled = true;
        };
    }, []);

    function handleAddTask(title) {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        };

        setTasks((currentTasks) => [...currentTasks, newTask]);
    }

    function handleToggleTask(id) {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task,
            ),
        );
    }

    function handleDeleteTask(id) {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id),
        );
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') {
            return task.completed;
        }

        if (filter === 'incomplete') {
            return !task.completed;
        }

        return true;
    });

    return (
        <main>

            <TaskForm onAddTask={handleAddTask} />
            <SecTitle title="Tasks" />

            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>

            {loading && <p>Loading tasks...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && filteredTasks.length === 0 && (<p>No tasks found</p>)}

            {!loading && !error && filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
            ))}
        </main>
    );
}

export default Tasks;
