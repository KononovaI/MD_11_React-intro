import React, { useState } from "react";

function App() {
  return <div className="App">
    <ToDoList />
    </div>;
}

interface Item {
	id: number;
	text: string;
	completed: boolean;
}

export const ToDoList: React.FC = () => {
	const [todos, setTodos] = useState<Item[]>([
		{id: 1, text: "Don't worry", completed: false},
		{id: 2, text: "Be happy!", completed: false},
	]);
	const [input, setInput] = useState<string>("");
	
	const handleToggle = (id:number) => {
		setTodos(
			todos.map((todo)=> {
				if(todo.id === id) {
					return {...todo,completed: !todo.completed};
				}
				return todo;
			})
		)
	};

const handleClick = () => {
	const newToDo: Item = {id: Date.now(), text: input, completed: false};
	setTodos([...todos, newToDo]);
}

  return <div className="wrapper">
		<h1>ToDo List</h1>
    <form action="Submit"></form>
    <input type="text" placeholder="Create new item" onChange={(e)=> setInput(e.currentTarget.value)}/><br />
		<button onClick={handleClick}>Create</button>
		<ul>
			{todos.map((todo)=> (
				<li key={todo.id} onClick={()=> handleToggle(todo.id)} style={{textDecoration: todo.completed ? "line-through":"none"}} > {todo.text}
				</li> //Definējam todo parametra porpertijus, ko gribam redzēt sarakstā. Un pievienojam eventu
			))}
		</ul>
		</div>;
};

export default App;