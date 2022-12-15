import React from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useState } from "react";

import "../pages/Dashboard.css";

export default function ChatWindow({
  receiver,
  setChatMessages,
  chatMessages,
}) {
  const [msg, setMsg] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const senderId = localStorage.getItem("id");
      const data = {
        msg,
        users: [senderId, receiver._id],
        senderId,
      };
      console.log(data);
      const response = await axios.post("http://localhost:5500/chat/add", data);
      if (response.status === 201) {
        setChatMessages((prev) => [...prev, data]);
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
          <span>{receiver.username}</span>
        </div>
        <div className="messages">
          {console.log(chatMessages)}
          {chatMessages &&
            chatMessages.map((data, index) => {
              return (
                <div key={index} className="chat">
                  {data.msg}
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
