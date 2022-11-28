import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const loginDetails = async (e) => {
    e.preventDefault();
    if (!(email || password)) {
      return;
    }
    try {
      const res = await axios.post("http://localhost:5500/user/login", {
        email,
        password,
      });
      if (res.status === 200) {
        console.log("RES", res);
        localStorage.setItem("id", res.data.id);
        return navigate("/dashboard");
      }
      console.log(res);
    } catch (err) {
      if (err.response) setErrorMessage(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <div className="d-flex">
        <div className="left-side">
          <h1 className="title">Login</h1>

          <form onSubmit={loginDetails}>
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ margin: ".5rem 1rem" }}
            />

            <TextField
              id="outlined-multiline-flexible"
              label="Password"
              required
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ margin: ".5rem 1rem" }}
            />

            <Button
              type="submit"
              variant="outlined"
              value="Submit"
              style={{
                margin: ".5rem 1rem",
                backgroundColor: "rgb(0 86 250)",
                color: "#fff",
                padding: ".8rem 0",
              }}
            >
              Submit
            </Button>
            <p style={{ color: "red", margin: "1rem" }}>{errorMessage}</p>
            <div className="text">
              <Link to="/" className="link">
                Don't have an account? <Button>Register</Button>
              </Link>
            </div>
          </form>
        </div>
        <div className="right-side">
          <h1 className="main-title">Welcome to Chat App</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
