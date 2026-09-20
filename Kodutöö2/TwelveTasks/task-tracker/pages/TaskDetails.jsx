
import { Link, useParams } from 'react-router-dom';

function TaskDetails({ tasks }) {
    const { taskId } = useParams();

    const task = tasks.find((task) => task.id === Number(taskId));

    if (!task) {
        return (
            <main>
                <h1>Task not found</h1>
                <p>No task exists with ID {taskId}.</p>
                <Link to="/tasks">Back to tasks</Link>
            </main>
        );
    }

    return (
        <main>
            <h1>{task.title}</h1>

            <p> Status: {task.completed ? 'Completed' : 'Not completed'}</p>

            <Link to="/tasks">Back to tasks</Link>
        </main>
    );
}

export default TaskDetails;

