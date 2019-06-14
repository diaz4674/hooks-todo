import React, {useState} from 'react'
import axios from 'axios'

const Todo = props => {

    const [todoName, setTodoName] = useState('')
    const [todoList, setTodoList] = useState([])

    const inputChangeHandler = (e) => {
        setTodoName(e.target.value)
    }

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName))
    }

    return (
        <React.Fragment>
            <input type = 'text' placeholder = "Todo" onChange = {inputChangeHandler} value = {todoName}/>
            <button type = 'button' onClick = {todoAddHandler} >Add</button>
            <ul> 
                {todoList.map((todo, i) => (
                    <li key = {i}> {todo} </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default Todo