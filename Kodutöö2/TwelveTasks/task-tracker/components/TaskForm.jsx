import { useState } from 'react';

export function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');


    function handleSubmit(event) {
        event.preventDefault();

        const trimmedTitle = title.trim()

        if (!trimmedTitle) {
            setError('Task title cannot be empty.');
            return;
        }

        onAddTask(trimmedTitle)
        setTitle('')
        setError('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="task-title">Task title:</label>

            <input id="task-title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />

            <button type="submit">Add Task</button>

            {error && <p>{error}</p>}
        </form>
    );
}
