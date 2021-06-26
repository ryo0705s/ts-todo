import { Button, Grid, ListItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { db } from "./firebase";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

interface PROPS {
  id: string;
  title: string;
}
const TaskItems: React.FC<PROPS> = (props) => {
  // const { todos, setTodos } = props;
  const [title, setTitle] = useState(props.title);
  const editTodos = () => {
    // setTitle(props.todos);
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };
  const deleteTodos = () => {
    db.collection("tasks").doc(props.id).delete();
  };
  return (
    <>
      <ListItem>
        <h2>{props.title}</h2>
        <Grid container justify="flex-end">
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Edit task"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setTodos(e.target.value)
            }
          />
          <Button onClick={editTodos}>
            編集
            <EditOutlinedIcon />
          </Button>
          <Button onClick={deleteTodos}>
            削除
            <DeleteOutlinedIcon />
          </Button>
        </Grid>
      </ListItem>
    </>
  );
};

export default TaskItems;
