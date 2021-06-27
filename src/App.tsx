import { Button, List, TextField, Typography } from "@material-ui/core";
// import { Collections } from "@material-ui/icons";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import "./App.css";
import { auth, db } from "./firebase";
import TaskItems from "./TaskItems";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = (props: any) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [todos, setTodos] = useState("");
  const handleChange = () => {
    db.collection("tasks").add({ title: todos });
  };
  // const handleLogout = () => {
  //   auth.logoutWithEmailAndPassword(email, password);
  //   history.pushState("/login");
  // };
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  });
  return (
    <>
      <Typography align="center">
        <h1>ts-todo</h1>
        <Button
          onClick={async () => {
            try {
              await auth.signOut();
              props.history.push("login");
            } catch (error) {
              alert(error.message);
            }
          }}
        >
          <ExitToAppIcon />
        </Button>
        <TextField
          className={classes.field}
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
        <List className={classes.list}>
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
