import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
// import axios from "axios";
import { useState } from "react";
// import io from "socket.io-client";
// import { useRef } from "react";
// import moment from "moment";

export default function GroupChatWindow() {
  //  const chatWindow = useRef(null);
  const [groupMsg, setGroupMsg] = useState("");

  const stringAvatar = (name) => {
    if (!name) return;
    return {
      children: `${name.split("")[0][0].toUpperCase()}`,
    };
  };

  const senderId = localStorage.getItem("id");

  return (
    <>
      <div
      //  className={`chat-window ${
      //    Object.keys(receiver).length === 0 ? "hide" : "block"
      //  }`}
      >
        <div className="header">
          <Avatar alt="" src="" {...stringAvatar()} />
          <span>{}</span>
        </div>
        <div className="messages">
          {/* {chatMessages &&
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
           })} */}
        </div>
        <form className="chat-field">
          <div className="send-btn">
            <input
              className="text-field"
              placeholder="Type here..."
              type="text"
              value={groupMsg}
              onChange={(e) => setGroupMsg(e.target.value)}
            ></input>
            <button disabled={!groupMsg} className="send">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
