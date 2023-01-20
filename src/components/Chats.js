import React, { useEffect } from "react";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { config } from "../config";

export default function Chats({
  setChatMessages,
  contactsLists,
  setReceiver,
  setContactLists,
}) {
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get(
          `${config.API.baseURL}/contact/user?userId=${localStorage.getItem(
            "id"
          )}`,
          {
            headers: {
              Authorization: localStorage.getItem("auth"),
            },
          }
        );
        setContactLists(response.data.userContact);
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, [setContactLists]);

  const stringAvatar = (name) => {
    console.log("name", name);
    if (!name) return;
    return {
      children: `${name.split("")[0][0].toUpperCase()}`,
    };
  };

  const handleCurrentReceiver = async (contact) => {
    setReceiver(contact);
    const response = await axios.get(`${config.API.baseURL}/chat/oneToOne`, {
      params: {
        senderId: userId,
        receiverId: contact.id,
      },
    });
    setChatMessages(response.data.chats);
  };
  return (
    <>
      {contactsLists.map(({ contact }, index) => {
        return (
          <div key={index} className="one-chat">
            <ListItem
              onClick={() => handleCurrentReceiver(contact)}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src=""
                  {...stringAvatar(contact.username)}
                />
              </ListItemAvatar>
              <ListItemText
                primary={contact.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {contact.email}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </>
  );
}
