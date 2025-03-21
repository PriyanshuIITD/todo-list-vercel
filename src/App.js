import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get('/api/todos')  // Vercel deployment
      .then(res => setTodos(res.data))
      .catch(err => console.log('Error fetching todos:', err));
  }, []);

  const addTodo = () => {
    if (task.trim() === '') return;
    axios.post('/api/todos', { task })
      .then(res => {
        setTodos([res.data, ...todos]);
        setTask('');
      })
      .catch(err => console.log('Error adding todo:', err));
  };

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>
      <main>
        <div className="todo-input">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={addTodo}>Add Task</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo._id}>
              {todo.task} <span>({new Date(todo.date).toLocaleDateString()})</span>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <p>Built with ❤️ by Priyanshu</p>
      </footer>
    </div>
  );
}

export default App;