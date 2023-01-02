import React, { useEffect, useState } from "react";

import "../styles/Dashboard.css";
import Chats from "../components/Chats";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";

import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GroupChat from "../components/GroupChat";

import Box from "@mui/material/Box";
import AddContact from "../components/AddContact";
import ChatWindow from "../components/ChatWindow";
import GroupChatWindow from "../components/GroupChatWindow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#d9d0c9",
  border: "2px solid #d9d0c9",
  boxShadow: 24,
  p: 4,
};
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contactsLists, setContactLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [receiver, setReceiver] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
    const [groupId, setGroupId] = useState("");

  const firstName = location.state.data.firstname;

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!(localStorage.getItem("auth") && localStorage.getItem("id"))) {
      navigate("/login");
    }
  }, [navigate]);

  const stringAvatar = (name) => {
    console.log("name", name);
    if (!name) return;
    return {
      children: `${name.split("")[0][0].toUpperCase()}`,
    };
  };

  return (
    <div className="main-page">
      <List
        style={{
          overflowY: "scroll",
          height: "100vh",
          boxShadow: "0 0 6px 0 grey",
          width: "30vw",
        }}
        sx={{
          bgcolor: "background.paper",
          width: "40%",
        }}
      >
        <div className="userInfo">
          <div className="user">
            <Avatar alt="Remy Sharp" src="" {...stringAvatar(firstName)} />
            <span>{firstName}</span>
          </div>
          <Button
            style={{ fontSize: ".7rem", color: "#fff", backgroundColor: "red" }}
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 200,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <AddContact
                  setContactLists={setContactLists}
                  setOpen={setOpen}
                />
              </Box>
            </Fade>
          </Modal>
        </div>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label="Contacts" value="1" />
            <Tab label="Groups" value="2" />
          </TabList>
          <TabPanel style={{ padding: 0 }} value="1">
            <BottomNavigationAction
              style={{ float: "right" }}
              label="person"
              value="person"
              onClick={handleOpen}
              icon={<PersonAddIcon />}
            />
            <Chats
              contactsLists={contactsLists}
              setContactLists={setContactLists}
              setReceiver={setReceiver}
              setChatMessages={setChatMessages}
            />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="2">
            <GroupChat firstName={firstName} setGroupId={setGroupId} />
          </TabPanel>
        </TabContext>
      </List>
        {console.log(groupId)}
      {value === "1" ? (
        <ChatWindow
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          receiver={receiver}
        />
      ) : (
        <GroupChatWindow groupId={groupId}/>
      )}
    </div>
  );
};

export default Dashboard;
