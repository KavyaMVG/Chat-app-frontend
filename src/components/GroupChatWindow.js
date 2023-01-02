import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function GroupChatWindow({ groupId }) {
  const [groupMsg, setGroupMsg] = useState([]);
  const senderId = localStorage.getItem("id");

  console.log(groupId);
  useEffect(() => {
    const handleGroupChat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/groupChat/groupMsg?groupId=${groupId}`
        );
        console.log("res", response);
      } catch (err) {
        console.log(err);
      }
    };
    handleGroupChat();
  }, [groupId]);

  const sendGroupMsg = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5500/groupChat/addGroupChat",
        {
          groupId,
          msg: groupMsg,
          senderId,
        }
      );
      console.log("GRPPP", response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form>
      <div style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="message"
          value={groupMsg}
          onChange={(e) => setGroupMsg(e.target.value)}
          style={{ width: "100%", padding: "1rem" }}
        />
        <button onClick={(e) => sendGroupMsg(e)}>send</button>
      </div>
    </form>
  );
}
