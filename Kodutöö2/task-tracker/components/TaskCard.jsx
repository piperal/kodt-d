function TaskCard({ task }) {
    return (
        <div className="task-card">
            <h2>{task.title}</h2>
            <p>{task.completed ? 'Completed' : 'Not completed'}</p>
        </div>
    );
}

export default TaskCard;