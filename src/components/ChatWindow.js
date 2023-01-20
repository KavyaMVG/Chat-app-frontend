import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
// import axios from "axios";
import { useState } from "react";
import io from "socket.io-client";
import { useRef } from "react";
import moment from "moment";
import { config } from "../config";

import "../styles/Dashboard.css";

const socket = io(`wss://chat-app-backend-production-2d04.up.railway.app:8080`);

export default function ChatWindow({
  receiver,
  chatMessages,
  setChatMessages,
}) {
  const [msg, setMsg] = useState("");
  const chatWindow = useRef(null);
  const senderId = localStorage.getItem("id");
  socket.on("connect", () => {
    console.log("Connected to socket client");
  });

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const data = {
        msg,
        receiverId: receiver.id,
        senderId,
      };
      socket.emit("message", { data });
      setMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setChatMessages([...chatMessages, data]);
    });
  }, [setChatMessages, chatMessages]);

  const scrollToBottom = () => {
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    chatWindow.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const formateDate = (dateTime) => {
    const time = moment(dateTime).local().format("hh:mm A");
    return time;
  };

  const stringAvatar = (name) => {
    if (!name) return;
    return {
      children: `${name.split("")[0][0].toUpperCase()}`,
    };
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <>
      <div
        className={`chat-window ${
          Object.keys(receiver).length === 0 ? "hide" : "block"
        }`}
      >
        <div className="header">
          <Avatar alt="" src="" {...stringAvatar(receiver.username)} />
          <span>{receiver.username}</span>
        </div>
        <div ref={chatWindow} className="messages">
          {chatMessages &&
            chatMessages.map((data, index) => {
              return (
                <div
                  key={index}
                  className={`chat ${
                    senderId !== data.senderId ? "message-receiver" : ""
                  }`}
                >
                  <p className="chat-msg"> {data.msg}</p>
                  <p className="chat-time"> {formateDate(data.createdAt)}</p>
                </div>
              );
            })}
        </div>
        <form className="chat-field" onSubmit={sendMessage}>
          <div className="send-btn">
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
          </div>
        </form>
      </div>
    </>
  );
}
