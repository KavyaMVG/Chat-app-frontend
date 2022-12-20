import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
        const { data } = res;
        localStorage.setItem("id", data.user._id);
        localStorage.setItem("auth", data.user.token);
        return navigate("/dashboard", { state: { data: data.user } });
      }
    } catch (err) {
      if (err.response) setErrorMessage(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth") && localStorage.getItem("id")) {
      navigate("/dashboard");
    }
  }, [navigate]);
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
              <Link to="/" className="link">
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
