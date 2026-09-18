import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import { getTasks } from '../services/taskApi';
import Home from '../pages/Home';
import Tasks from '../pages/Tasks';
import TaskDetails from '../pages/TaskDetails';
import "./Index.css"

function App() {
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

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              loading={loading}
              error={error}
              onAddTask={handleAddTask}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          }
        />

        <Route
          path="/tasks/:taskId"
          element={<TaskDetails tasks={tasks} />}
        />


      </Routes>
    </>
  );
}

export default App;