// File name: TodoWrapper.jsx
// Author: sunny
import { useState, useEffect } from "react"
import CreateForm from "./CreateForm"
import ToDo from "./ToDo"
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function TodoWrapper() {
    // Store the mode of server or client
    const [useCloud, setUseCloud] = useState(() => {
        return localStorage.getItem("storageMode") === "cloud";
    });
    // Store to-do list
    const [toDos, setToDos] = useState(() => {
        const storedToDos = localStorage.getItem("toDos");
        return storedToDos ? JSON.parse(storedToDos) : [];
    });

    const toggleStorageMode = () => {
        const newMode = !useCloud;
        setUseCloud(newMode);
        localStorage.setItem("storageMode", newMode ? "cloud" : "local");
    };

    const addToDo = (content) => {
        setToDos([...toDos, {content: content, id: Math.random(), 
            isCompleted: false, isEditing: false}])
    }
    const deleteToDo = (id) => {
        setToDos(toDos.filter((toDo) => {
            return toDo.id !== id
        }))
    }
    const toggleCompleted = (id) => {
        setToDos(toDos.map((toDo) => {
            return toDo.id === id 
                ? {...toDo, isCompleted: !toDo.isCompleted} 
                : toDo
        }))
    }
    const toggleIsEditing = (id) => {
        setToDos(toDos.map((toDo) => {
            return toDo.id === id 
                ? {...toDo, isEditing: !toDo.isEditing} 
                : toDo
        }))
    }
    const editToDo = (id, newContent) => {
        setToDos(toDos.map((toDo) => {
            return toDo.id === id 
            ? {...toDo, content: newContent, isEditing: false}
            : toDo
        }))
    }

    useEffect(() => {
        if (useCloud) {
            const fetchCloudToDos = async () => {
                const snapshot = await getDocs(collection(db, "toDos"));
                const cloudToDos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
                setToDos(cloudToDos);
            };
            fetchCloudToDos();
        } else {
            const stored = localStorage.getItem("toDos");
            setToDos(stored ? JSON.parse(stored) : []);
        }
    }, [useCloud]);

    useEffect(() => {
        if (useCloud) {
            toDos.forEach(async (toDo) => {
                await setDoc(doc(db, "toDos", String(toDo.id)), toDo);
            });
        } else {
            localStorage.setItem("toDos", JSON.stringify(toDos));
        }
    }, [toDos, useCloud]);

    return (
    <div className="wrapper">
        <div>
            <h1>To Do List</h1>
            <button className="storage-switch" onClick={toggleStorageMode}>{useCloud ? 
            "Use Local Storage" : "Use Cloud"}</button>
        </div>
        <CreateForm addToDo = {addToDo} />
        {toDos.map((toDo) => {
            return <ToDo toggleCompleted={toggleCompleted} 
            toggleIsEditing={toggleIsEditing}
            editToDo={editToDo}
            toDo={toDo} key={toDo.id} deleteToDo={deleteToDo}/>
        })}
    </div>
    )
    
}

export default TodoWrapper