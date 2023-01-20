import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { config } from "../config";

export default function AddContact({ setContactLists, setOpen }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const userId = localStorage.getItem("id");
  const addContact = async (e) => {
    e.preventDefault();

    const data = {
      userId,
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
        try {
          setContactLists((prev) => [...prev, data]);
        } catch (err) {
          console.log(err);
        }
        setOpen(false);
        return;
      }
    } catch (err) {
      setError(true);
      console.log(err);
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
