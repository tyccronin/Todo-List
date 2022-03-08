import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]); // object destructuring
  const todoNameRef = useRef();
  
  useEffect(() => { // store todo
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos)setTodos(storedTodos);
  }, []);

  useEffect(() => { // get todo
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }
 
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

 return (
    <>
      <div class = "card">
        <h1 class = "title">To-Do List</h1>
        <input class = "search-bar" ref={todoNameRef} type="text"/>
        <br></br>
        <br></br>
        <TodoList todos = {todos} toggleTodo = {toggleTodo} />
        <br></br>
        <br></br>
        <button onClick={handleAddTodo}>+</button>
        <button onClick={handleClearTodos}><svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683368540" viewBox="0 0 1024 1024" version="1.1" pId="9723" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z" pId="9724"></path></svg></button>
        <br></br>
        <br></br>
        <div class="description">{todos.filter(todo => !todo.complete).length} left to do</div>
      </div>
    </>
  );
}

export default App;
