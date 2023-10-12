import React, { useContext, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { config } from "../config";
import AuthContext from "../store/auth-context";
// import AuthContext from "../store/auth-context";

export default function AddContact({ setContactLists, setOpen }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);

  const addContact = async (e) => {
    e.preventDefault();
    const data = {
      userId: user._id,
      contact: {
        username: userName,
        email,
      },
    };

    try {
      const response = await axios.post(
        `${config.API.baseURL}/contact/add`,
        data
      );
      if (response.status === 201) {
        setContactLists((prev) => [...prev, data]);
        localStorage.setItem("contactLists", data);
        setOpen(false);
        return;
      }
    } catch (err) {
      setError(true);
    }
  };
  return (
    <form onSubmit={addContact}>
      <TextField
        id="outlined-multiline-flexible"
        label="Name"
        required
        type="text"
        style={{ margin: "1rem" }}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />

      <TextField
        id="outlined-multiline-flexible"
        label="Email"
        required
        type="email"
        style={{ margin: "1rem" }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>
          Error adding contact
        </p>
      ) : (
        ""
      )}
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
        Save
      </Button>
    </form>
  );
}
