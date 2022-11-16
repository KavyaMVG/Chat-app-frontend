import React from "react";
import Avatar from "@mui/material/Avatar";

import "../pages/Dashboard.css";

export default function ChatWindow() {
  return (
    <>
      <div className="chat-window" style={{ color: "white", width: "100%" }}>
        <Avatar alt="Remy Sharp" src="" />
        <span>KAvya</span>
        <input
          className="text-field"
          placeholder="Type here...."
          type="text"
        ></input>
        <button className="send">Send</button>
      </div>
    </>
  );
}
