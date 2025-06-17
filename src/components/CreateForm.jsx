// File name: CreateForm.jsx
// Author: sunny
import { useState } from "react";

function CreateForm ({addToDo}) {
    const [content, setContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        addToDo(content)
        setContent('')
    }
    return (
    <form className="create-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter To Do"
        value={content} 
        onChange={(e) => {setContent(e.target.value)}}/>
        <button type="submit">Add</button>
    </form>
    );
}

export default CreateForm