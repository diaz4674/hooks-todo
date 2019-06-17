import React from 'react'

const List = props => {
    console.log('Rendering the list...')
    return (
        <ul> 
        {props.items.map((todo, i) => (
            <li key = {todo.id} onClick = {props.onClick.bind(this, todo.id)}> {todo.name} </li>
        ))}
    </ul>
    )
}

export default List