
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  //onchange:-
  const [nvalue, setNvalue] = useState("");

  const saveValue = () => {
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
       title: nvalue,
        author:false
      })
    })
      .then((r) => r.json())
      .then((d) => {
        setTodos([...todos, d])
        setNvalue("");
      });
  }

  useEffect(() => {
    fetch("http://localhost:8080/todos?_page=1&_limit=2")
      .then((r) => r.json())
      .then((d) => {
         console.log(d)
        setTodos(d)
    })
  },[])
  return (
    <div className="App">
      <input onChange={(e) => {
        setNvalue(e.target.value)
        
      }} />
      <button onClick={saveValue}> + </button>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.id}.{todo.title}</div>
      ))}
    </div>
  );
}

export default App;
