import { Collections } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [todos, setTodos] = useState("");
  const handleChange = () => {
    db.collection("tasks").add({ title: todos });
  };
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);
  return (
    <div className="App">
      <h1>ts-todo</h1>
      <input
        type="text"
        value={todos}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodos(e.target.value)
        }
      />
      <button disabled={!todos} onClick={handleChange}>
        追加
      </button>
      {tasks.map((task) => (
        <h3 key={task.id}>{task.title}</h3>
      ))}
    </div>
  );
};

export default App;
