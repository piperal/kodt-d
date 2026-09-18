
import { Link } from 'react-router-dom';
function TaskCard({ task, onToggle, onDelete }) {
    return (
        <div className="task-card">
            <h2>
                <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </h2>

            <p>{task.completed ? 'Completed' : 'Not completed'}</p>

            <button onClick={() => onToggle(task.id)}>
                {task.completed ? 'Mark incomplete' : 'Mark completed'}
            </button>

            <button onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
}

export default TaskCard;

