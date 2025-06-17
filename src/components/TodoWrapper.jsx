// File name: TodoWrapper.jsx
// Author: sunny
import { useState, useEffect } from "react"
import CreateForm from "./CreateForm"
import ToDo from "./ToDo"

function TodoWrapper() {

    const [toDos, setToDos] = useState(() => {
        const storedToDos = localStorage.getItem("toDos");
        return storedToDos ? JSON.parse(storedToDos) : [];
    });

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
        localStorage.setItem("toDos", JSON.stringify(toDos));
    }, [toDos]);

    return (
    <div className="wrapper">
        <h1>To Do List</h1>
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