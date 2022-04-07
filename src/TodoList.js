import React from 'react'
import Todo from './Todo'


export default function TodoList({ todos, toggleTodo }) {
  return (
    todos.map(todo => { // Map over current array and return elements of actual todos
        return <Todo key = {todo.id} toggleTodo = {toggleTodo} todo = {todo} />
    }) // For each element in the array return Todo component 
       // with single todo item passed to it.
       // Each todo item has a unique key
  );
}
