import React, { useContext } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { useRef } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { config } from "../config";

import { useState, useEffect } from "react";
import AuthContext from "../store/auth-context";

export default function GroupChatWindow({ currentGroup, chatMsg, setChatMsg }) {
  const GroupChatWindow = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(AuthContext);

  const [groupMsg, setGroupMsg] = useState([]);
  const senderId = user._id;

  const sendGroupMsg = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.API.baseURL}/groupChat/addGroupChat`,
        {
          groupId: currentGroup._id,
          msg: groupMsg,
          senderId,
        }
      );
      const groupChatData = response.data;
      setChatMsg((prev) => [...prev, groupChatData]);
      setGroupMsg("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToBottom = () => {
    GroupChatWindow.current.scrollTop = GroupChatWindow.current.scrollHeight;
    GroupChatWindow.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const grpMember = currentGroup.members;

  useEffect(() => {
    scrollToBottom();
  }, [chatMsg]);

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
  return (
    <div
      className={`chat-window ${
        Object.keys(currentGroup).length === 0 ? "hide" : "block"
      }`}
    >
      <div className="header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Avatar alt="" src="" {...stringAvatar(currentGroup.name)} />
          <span>{currentGroup.name}</span>
        </div>
        <Button
          id="fade-button"
          style={{ color: "#000" }}
          onClick={handleClick}
        >
          Group
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {grpMember &&
            grpMember.map((mem) => {
              return (
                <MenuItem style={{ justifyContent: "center" }}>
                  {mem.name}
                </MenuItem>
              );
            })}
        </Menu>
      </div>
      <div ref={GroupChatWindow} className="messages">
        {chatMsg &&
          chatMsg.map((grpChat, index) => {
            return (
              <div
                key={index}
                className={`chat ${
                  senderId !== grpChat.senderId ? "message-receiver" : ""
                }`}
              >
                <p className="chat-msg"> {grpChat.msg}</p>
                <p className="chat-time"> {formateDate(grpChat.createdAt)}</p>
              </div>
            );
          })}
      </div>

      <form className="chat-field">
        <div className="send-btn">
          <input
            type="text"
            className="text-field"
            placeholder="message"
            value={groupMsg}
            onChange={(e) => setGroupMsg(e.target.value)}
          />
          <button
            disabled={!groupMsg}
            className="send"
            onClick={(e) => sendGroupMsg(e)}
          >
            send
          </button>
        </div>
      </form>
    </div>
  );
}
