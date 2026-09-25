
//See funktsioon saadab /api/tasks enpointi calli ja tagastab andmed
const gatAllTasks = async () => {
    //Siin in toodud .env failist välja VITe_API_URL
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
};



const getTaskById = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`);

    if (!response.ok) {
        throw new Error("Failed to retrieve task");
    }

    return response.json();
}

const getCompletedTasks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/completed`);

    if (!response.ok) {
        throw new Error("Failed to retrieve task");
    }

    return response.json();
}


//See funktsioon saadad POST requesti endpointi
const sendData = async (payload) => {
    payload.title.trim()
    if (typeof (payload.title) != "string") {
        throw new Error('Must be a string value');
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(response);
    }

    return response.json();
};

const deleteData = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/delete/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(response);
    }

    return response.json();
}

const updateTask = async (title, id) => {

    if (title == '' || title.length == 0) {
        return
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title })
    });

    if (!response.ok) {
        throw new Error(response);
    }

    return response.json();
}


//Siin need exporditakse
export { gatAllTasks, sendData, getTaskById, getCompletedTasks, deleteData, updateTask };