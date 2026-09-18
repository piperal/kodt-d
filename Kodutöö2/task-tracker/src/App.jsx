import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import { getTasks } from '../services/taskApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false)

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
          setError('Failed to load tasks.');
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

  return (
    <>
      <Header />
      <button onClick={() => { setCompleted(!completed) }}>Press Button:</button>
      <p>Status: {completed ? "Completed" : "Not Completed"} </p>

      <main>
        {loading && <p>Loading tasks...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && tasks.length === 0 && (
          <p>No tasks found.</p>
        )}

        {!loading &&
          !error &&
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </main>
    </>
  );
}

export default App;