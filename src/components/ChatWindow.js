import React from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useState } from "react";

import "../pages/Dashboard.css";

export default function ChatWindow() {
  const [msg, setMsg] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
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
      <div className="chat-window">
        <div className="header">
          <Avatar alt="Remy Sharp" src="" />
          <span>Kavya</span>
        </div>
        <div className="messages">
          {chatMessages.map((message, index) => {
            return (
              <div key={index} className="chat">
                {message}
              </div>
            );
          })}
        </div>
        <form className="chat-field" onSubmit={sendMessage}>
          <input
            className="text-field"
            placeholder="Type here..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></input>
          <button disabled={!msg} className="send">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
