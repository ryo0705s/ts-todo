import { Button, List, TextField, Typography } from "@material-ui/core";
import { Collections } from "@material-ui/icons";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";
import TaskItems from "./TaskItems";

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
    <>
      <Typography align="center">
        <h1>ts-todo</h1>
        <TextField
          InputLabelProps={{ shrink: true }}
          color="primary"
          label="new task ?"
          type="text"
          value={todos}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodos(e.target.value)
          }
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!todos}
          onClick={handleChange}
        >
          追加
          <AddToPhotosIcon />
        </Button>
        <List>
          {tasks.map((task) => (
            <TaskItems
              id={task.id}
              title={task.title}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </List>
      </Typography>
    </>
  );
};

export default App;
