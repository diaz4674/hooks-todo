import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/Todo'

class App extends React.Component {
  render(){
    return (
      <div className = 'App'>
      <Todo />

    </div>
    )
  }
}

export default App