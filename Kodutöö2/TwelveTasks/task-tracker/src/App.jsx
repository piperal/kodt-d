import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import { getTasks } from '../services/taskApi';
import Home from '../pages/Home';
import Tasks from '../pages/Tasks';
import TaskDetails from '../pages/TaskDetails';
import "./Index.css"

function App() {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      try {
        const data = await getTasks();

        if (!cancelled) {
          setTasks(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.log(err)
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

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/tasks/:taskId" element={<TaskDetails tasks={tasks} />} />

      </Routes>
    </>
  );
}

export default App;