import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { config } from "../config";
import authContext from "../store/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUser } = useContext(authContext);
  const navigate = useNavigate();

  const loginDetails = async (e) => {
    e.preventDefault();
    if (!(email || password)) {
      return;
    }
    try {
      const res = await axios.post(`${config.API.baseURL}/user/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) setErrorMessage(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (user && user._id && user.token) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  return (
    <div className="container">
      <div className="d-flex">
        <div className="left-side login">
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
                backgroundColor: "#25a876",
                color: "#fff",
                padding: ".8rem 0",
              }}
            >
              Submit
            </Button>
            <p style={{ color: "red", margin: "1rem" }}>{errorMessage}</p>
            <div className="text">
              <Link to="/register" className="link">
                Don't have an account? <Button>Register</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
