import React from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useState } from "react";

import "../pages/Dashboard.css";

export default function ChatWindow() {
  const [msg, setMsg] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const getMsg = async () => {
    try {
      const response = await axios.post("http://localhost:5500/user/chats", {
        msg,
      });
      if (response.status === 201) {
        setChatMessages((prev) => [...prev, msg]);
        setMsg("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="chat-window" style={{ color: "white", width: "100%" }}>
        <Avatar alt="Remy Sharp" src="" />
        <span>Kavya</span>
        {chatMessages.map((message, index) => {
          return (
            <div key={index} className="chats">
              <p>{message}</p>
            </div>
          );
        })}

        <input
          className="text-field"
          placeholder="Type here...."
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        ></input>
        <button onClick={getMsg} disabled={!msg} className="send">
          Send
        </button>
      </div>
    </>
  );
}
