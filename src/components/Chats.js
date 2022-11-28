import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Chats({ setReceiver, setChatMessages }) {
  const [contactsLists, setContactLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/contact/user?userId=63748ec24e47dcb7b39641e2"
        );
        setContactLists(response.data.userContact);
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, []);

  const addContact = async (e) => {
    e.preventDefault();

    const data = {
      username: userName,
      email,
      userId,
    };
    try {
      const response = await axios.post("http://localhost:5500/contact/add", {
        username: userName,
        email,
        userId,
      });
      console.log("res:", response);
      if (response.status === 201) {
        try {
          setContactLists((prev) => [...prev, data]);
        } catch (err) {
          console.log(err);
        }
        setOpen(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCurrentReceiver = async (contact) => {
    setReceiver(contact);
    const response = await axios.get("http://localhost:5500/chat/oneToOne", {
      params: {
        senderId: userId,
        receiverId: contact._id,
      },
    });
    setChatMessages(response.data.chats);
  };
  return (
    <>
      <List
        style={{ overflowY: "scroll", height: "100vh" }}
        sx={{
          bgcolor: "background.paper",
          width: "40%",
        }}
      >
        <div>
          <BottomNavigationAction
            label="person"
            value="person"
            onClick={handleOpen}
            icon={<PersonAddIcon />}
          />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <form onSubmit={addContact}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Name"
                    required
                    type="text"
                    style={{ margin: "1rem" }}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />

                  <TextField
                    id="outlined-multiline-flexible"
                    label="Email"
                    required
                    type="text"
                    style={{ margin: "1rem" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    value="Submit"
                    style={{
                      margin: ".5rem 1rem",
                      backgroundColor: "rgb(0 86 250)",
                      color: "#fff",
                      padding: ".8rem 0",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Fade>
          </Modal>
        </div>
        {contactsLists.map((contact, index) => {
          return (
            <div key={index}>
              <ListItem
                onClick={() => handleCurrentReceiver(contact)}
                alignItems="flex-start"
              >
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
    </>
  );
}
