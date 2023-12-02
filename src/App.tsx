import React, { useState } from "react";
import deleteIcon from "./assets/delete_icon.png";

function App() {
  return (
    <div className="App">
      <ToDoList />
    </div>
  );
}

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([
    { id: 1, text: "Don't worry", completed: false },
    { id: 2, text: "Be happy!", completed: false },
  ]);
  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    const newToDo: Item = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newToDo]);
    setInput(""); // Ievades lauks jāiztīra pēc jauna ToDo izveides
  };

  return (
    <div className="wrapper">
      <h1>ToDo List</h1>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Create new item"
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
        />
        <br />
        <button type="submit">Create</button>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {" "}
              {todo.text}
              <img
                src={deleteIcon}
                alt="Delete icon"
                style={{
                  width: "15px",
                  height: "15px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(todo.id);
                }}
              />
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default App;
