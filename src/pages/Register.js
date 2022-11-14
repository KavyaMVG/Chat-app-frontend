import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
// import Box from "@mui/material/Box";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerStyles = {
    display: errorMessage ? "block" : "none",
    color: "red",
  };

  const postUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5500/register", {
        firstname,
        lastname,
        email,
        password,
      });
      if (res.status === 201) {
        return navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response) setErrorMessage(err.response.data.msg);
    }
  };

  //   const userDetails = ()

  return (
    <div className="container">
      <div className="d-flex">
        <div className="left-side">
          {/* <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          ></Box> */}
          <form onSubmit={postUser}>
            <h1 className="title">Register</h1>

            <div className="name">
              <TextField
                id="outlined-multiline-flexible"
                label="Firstname"
                required
                type="text"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                style={{ width: "50%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Lastname"
                type="text"
                required
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                style={{ width: "50%" }}
              />
            </div>

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
              type="password"
              required
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
            <div className="text">
              <Link to="/login" className="link">
                Already have an account?<Button>Login</Button>
              </Link>
            </div>
          </form>
          <p style={registerStyles}>{errorMessage}</p>
        </div>
        <div className="right-side">
          <h1 className="main-title">Welcome to Chat App</h1>
        </div>
      </div>
    </div>
  );
};

export default Register;