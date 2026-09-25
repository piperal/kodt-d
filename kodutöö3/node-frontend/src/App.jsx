import { useEffect, useState } from "react";
import { gatAllTasks, sendData, getTaskById, getCompletedTasks, deleteData, updateTask } from './services/taskApi.js'

function App() {

  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState('')
  const [updateTitle, setUpdateTitle] = useState();
  const [error, setError] = useState('')
  const [id, setId] = useState();


  //Siin võetakse andmed getData poolt vastu async getTasks funktsiooniga
  useEffect(() => {
    const getTasks = async () => {
      try {
        const gotData = await gatAllTasks()
        setData(gotData)
      }
      catch (err) {
        if (err) {
          setError(err)
        }
      }
    }
    getTasks()

  }, [])

  //Siin map-itakse andmed ära ja tuuakse need esile
  const displayData = () => {
    if (!data || data.length === 0) {
      return (<h1>No tasks to show</h1>)
    }
    if (error) {
      return (<h1>An error has occured: {error}</h1>)
    }
    return (
      <>
        {data.map(task =>
          <div key={task.id}>
            <h1>Title: {task.title}</h1>
            <h1>Id: {task.id}</h1>
            <h1>Completion: {task.completed ? "True" : "False"}</h1>
            <button onClick={() => { deleteData(task.id); window.location.reload(); }}>Delete</button><br /><br />
            <input onChange={(e) => { setUpdateTitle(e.target.value); }}></input>
            <button onClick={() => { updateTask(updateTitle, task.id); window.location.reload(); }}>Update Title</button>
          </div>
        )}
      </>)
  }

  //See funktsioon, sendPost, saadab sendDatale payloadi, ehk siis uue taski mida lisada  
  const sendPost = async () => {

    try {
      const payload = {
        id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        title: newTitle,
        completed: false
      }
      if (payload.title == '') {
        return
      }

      const result = await sendData(payload)
      setData(prev => [...prev, result.task]);
      setNewTitle('');
    }
    catch (err) {
      if (err) {
        setError(err)
      }
    }
  }

  const sendById = async () => {
    try {
      const task = await getTaskById(id)
      setData([task])
    }
    catch (err) {
      if (err) {
        setData([])
      }
      console.error(err)
    }
  }


  const findCompleted = async () => {
    const completed = await getCompletedTasks()
    setData(completed)
  }


  const findById = () => {
    return (<>
      <label>Find by id: </label>
      <input onChange={(e) => { setId(e.target.value) }}></input>
      <button onClick={() => { sendById() }}>Find by id</button>
    </>)

  }

  //See toob esile taski lisamine inputid ja saatmise nuppu 
  const addTask = () => {

    return (
      <div>
        <label>Title:</label>
        <input onChange={(e) => { setNewTitle(e.target.value) }}></input><br />
        <button onClick={() => { sendPost() }}>Add Task</button>
      </div>)
  }


  return (
    <>
      {findById()}<br /><br />
      {addTask()}<br />
      <button onClick={() => { window.location.reload(); }}>Reset Tasks</button>
      <button onClick={() => { findCompleted() }}>Find Completed</button><br />
      {displayData()}
    </>
  )
}

export default App
