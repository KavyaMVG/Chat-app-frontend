import React, { useContext, useEffect, useCallback } from "react";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { config } from "../config";
import AuthContext from "../store/auth-context";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function Chats({
  setChatMessages,
  contactsLists,
  setReceiver,
  setContactLists,
}) {
  const { user } = useContext(AuthContext);

  const getContacts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${config.API.baseURL}/contact/user?userId=${user._id || ""}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setContactLists(response.data.userContact);
    } catch (err) {
      console.log(err);
    }
  }, [user, setContactLists]);

  useEffect(() => {
    getContacts();
  }, [setContactLists, user, getContacts]);

  const stringAvatar = (name) => {
    if (!name) return;
    return {
      children: `${name.split("")[0][0].toUpperCase()}`,
    };
  };

  const handleCurrentReceiver = async (contact) => {
    setReceiver(contact);
    const response = await axios.get(`${config.API.baseURL}/chat/oneToOne`, {
      params: {
        senderId: user._id,
        receiverId: contact.id,
      },
    });
    setChatMessages(response.data.chats);
  };

  const handleDelete = async () => {
    const confirm = window.confirm("This will remove all the contacts");
    if (confirm) {
      await axios.delete(`${config.API.baseURL}/contact/delete`);
      getContacts();
    }
  };

  return (
    <>
      <Button onClick={handleDelete} style={{ margin: ".5rem" }}>
        <Delete />
      </Button>
      {contactsLists.map(({ contact }, index) => {
        return (
          <div key={index} className="one-chat">
            <ListItem
              onClick={(event) => handleCurrentReceiver(contact)}
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
