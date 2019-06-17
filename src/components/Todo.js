import React, {useState, useEffect, useReducer, useRef} from 'react'
import axios from 'axios'
import List from './List'

const Todo = props => {

    // const [todoName, setTodoName] = useState('')
    // const [submittedTodo, setSubmittedTodo] = useState(null)
    // const [todoList, setTodoList] = useState([])

    const todoInputRef = useRef()

    const todoListReducer = (state, action) => {
        switch(action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter( todo => todo.id !== action.payload);
            default:
                return state;
        }
    }
    const [todoList, dispatch] = useReducer(todoListReducer, [])



    useEffect(() => {
        axios.get('https://todohooks-3c2bf.firebaseio.com/todos.json')
        .then(res => {
            console.log(res)
            const todoData = res.data
            const todos = []

            for(const key in todoData) {
                todos.push({id: key, name: todoData[key].name})
            }
            dispatch({type: 'SET', payload: todos})
        })
        //React will apply this as a clean up before it applies the top code ^
        return() => {
            console.log('cleanup')
        }
    }, 
    //Empty array for second arguement is to run it like ComponentDidMount
    //If a variable is put in, it will run when that changes, such as the todoName state

    [])

    // useEffect( 
    //     () => {
    //     if(submittedTodo){
    //         dispatch({type: 'ADD', payload: submittedTodo} )
    //     }

    // }, [submittedTodo])

    const mouseMoveHandler = e => {
        console.log(e.clientX, e.clientY)
    }




    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler)
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    }, [])

    // const inputChangeHandler = (e) => {
    //     setTodoName(e.target.value)
    // }

    // const inputChangeHandler = e => {
    //     setTodoState({
    //         userInput: e.target.value,
    //         todoList: todoState.todoList
    //     })
    //     setTodoName(e.target.value)
    // }
    

    const todoAddHandler = () => {

        const todoName = todoInputRef.current.value;
        
        axios.post('https://todohooks-3c2bf.firebaseio.com/todos.json', {name: todoName})
        .then(res => {
            setTimeout( () => {
                const todoItem = {id: res.data.name, name: todoName}
               dispatch({type: 'ADD', payload: todoItem })
            }, 3000)

        })
        .catch(err => {
            console.log(err)
        })

    }
    const todoRemoveHandler = todoId => {
        axios
            .delete(`https://todohooks-3c2bf.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch( {type: 'REMOVE', payload: todoId} )
            })
            .catch(err => console.log(err))
       
    }

    return (
        <React.Fragment>
            <input type = 'text' placeholder = "Todo" ref = {todoInputRef}/>
            <button type = 'button' onClick = {todoAddHandler} >Add</button>
            <List items = {todoList} onClick = {todoRemoveHandler} />
        </React.Fragment>
    )
}

export default Todo