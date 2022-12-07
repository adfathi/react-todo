import React, {useState, useRef,  useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid'
import logo from './logo.svg'

console.log(logo);
const STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTods]=useState([])
  const todoNameRef = useRef()
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (storedTodos.length) setTods(storedTodos)
  }, [])
  
  useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTods(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '') return
    setTods(prevTodods=> {
      return [...prevTodods, { id:uuidv4(), name:name, complete:false}]
    } )
    todoNameRef.current.value = null
  }

  function handleClearTodo() {
    const newTodos = todos.filter (todo => !todo.complete)
    setTods(newTodos)
  }
  
  return (
    <>
      <div>
        <img src={logo} alt="Logo" width="107" height="90" />
      </div>
      <div>
        <label>Andia's Todo List For Dstny</label>
        <p></p>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoNameRef} type="text" />
        <p></p>
        <button onClick={handleAddTodo}> Add Todo</button>
        <text>     </text>
        <button onClick={handleClearTodo}> Clear Completed Todo</button>
        <p></p>
        <div>{todos.filter (todo => !todo.complete).length} left to do</div>
      </div>
    </>
    
    
  )
}

export default App;
