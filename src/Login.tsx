import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { auth } from "./firebase";
import styles from "./Login.module.css";

const Login: React.FC = (props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const login = (email, password) => {
  //   auth.loginWithEmailAndPassword;
  // };
  // const handleLogin = (async () => {
  //   if(email | password) {
  //     await alert ("emilまたはpasswordが入力されていません")
  //     useState
  //   }
  // })
  useEffect(() => {
    const onSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
    return () => onSub();
  }, [props.history]);
  return (
    <>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="E-mail"
          name="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          type="password"
          InputLabelProps={{ shrink: true }}
          label="Password"
          name="password"
          value={password}
          onChange={(e: React.Onchange<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? "login" : "register"}
      </Button>
      <br />
      <Typography align="center">
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create a new account ?" : "Back to login"}
        </span>
      </Typography>
    </>
  );
};

export default Login;
