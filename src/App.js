import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4 } from 'uuid'; // Create random id's

const LOCAL_STORAGE_KEY = 'todoApp.todos'; // Create a local storage key for todo

// This is the root of the entire application
function App() {
  const [todos, setTodos] = useState([]); // Make array destructured and set to the current state
  const todoNameRef = useRef();
  
  useEffect(() => { // store todo
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos)setTodos(storedTodos); // if we have stored todos, set our stored todos to those todos
  }, []); // Array = all of our dependencies function called once, since empty, won't be recalled

  useEffect(() => { // get todo
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)); // get todo from local storage as a string
  }, [todos]); // Array = all of our todos

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id); // find the todo equal to our id
    todo.complete = !todo.complete; // allow us to toggle our todo from complete to not compelete
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value; // Reference ref in html below (current value of input)
    if(name === '') return; // Return if name is an empty string
    setTodos(prevTodos => { // Give previous todo and add new todo to list.
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null; // After clicking to add todo, text input box will be cleared
  }
 
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete); // Filter todos that are not complete
    setTodos(newTodos);
  }

// Use parentheses to return all code inside of them
// return the html code for the Todo List wrapped inside of an empty element (fragment)
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
