// File name: Editeform.jsx
// Author: sunny
import { useState } from "react";

function Editeform ({toDo, editToDo}) {
    const [content, setContent] = useState(toDo.content);
        const handleSubmit = (e) => {
            e.preventDefault()
            editToDo(toDo.id, content)
        }
        return (
        <form className="create-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter To Do"
            value={content} 
            onChange={(e) => {setContent(e.target.value)}}/>
            <button type="submit">Edite</button>
        </form>
        );
}

export default Editeform