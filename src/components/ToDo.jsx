// File name: ToDo.jsx
// Author: sunny
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Editeform from "./Editeform";
function ToDo ({toDo, deleteToDo, toggleCompleted, toggleIsEditing, editToDo}) {
    return toDo.isEditing ? (
        <Editeform toDo={toDo} editToDo={editToDo}/>
        ) : (
        <div className={`to-do ${toDo.isCompleted ? 'completed' : ''}`}>
            <p onClick={() => {toggleCompleted(toDo.id)}}>{toDo.content}</p>
            <div>
                <FaEdit onClick={() => {toggleIsEditing(toDo.id)}} style={{cursor: "pointer"}}/>
                <MdDeleteOutline onClick={() => {deleteToDo(toDo.id)}}
                style={{cursor: "pointer", marginLeft: '5px'}}/>
            </div>
        </div>)
}

export default ToDo