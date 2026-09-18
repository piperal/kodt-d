import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import SecTitle from "../components/SecTitle"


function Tasks({ tasks, loading, error, onAddTask, onToggle, onDelete }) {
    const [filter, setFilter] = useState('all');

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


            <TaskForm onAddTask={onAddTask} />
            <SecTitle title="Tasks"/>

            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>
                    Completed
                </button>
                <button onClick={() => setFilter('incomplete')}>
                    Incomplete
                </button>
            </div>

            {loading && <p>Loading tasks...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && filteredTasks.length === 0 && (
                <p>No tasks found</p>
            )}

            {!loading &&
                !error &&
                filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
                ))}
        </main>
    );
}

export default Tasks;
