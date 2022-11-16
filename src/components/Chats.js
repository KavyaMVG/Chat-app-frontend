import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function Chats() {
  const [contactsLists, setContactLists] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/contacts/lists?userId=63748ec24e47dcb7b39641e2"
        );
        setContactLists(response.data.userContact);
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, []);

  return (
    <List sx={{ bgcolor: "background.paper", width: "40%" }}>
      {contactsLists.map((contact, index) => {
        return (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
    </List>
  );
}
