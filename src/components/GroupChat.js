import React, { useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState } from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const GroupChat = ({ firstName, setCurrentGroup, setChatMsg }) => {
  const [open, setOpen] = useState(false);
  const [contactList, setContactList] = useState("");
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]);

  const userId = localStorage.getItem("id");

  const getContactList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/contact/user?userId=${localStorage.getItem(
          "id"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      setContactList(response.data.userContact);
    } catch (err) {
      console.log(err);
    }
  };

  const addMembers = (e, name, memberId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const member = {
        name,
        memberId,
      };
      setMembers((prev) => [...prev, member]);
    } else {
      const memberCopy = [...members];
      const filteredMember = memberCopy.filter(
        (mem) => memberId !== mem.memberId
      );
      console.log("FIL", filteredMember);
      setMembers(filteredMember);
    }
  };

  const createGroup = async () => {
    try {
      const memberCopy = [...members];
      const user = {
        name: firstName,
        memberId: userId,
      };
      memberCopy.push(user);
      setMembers(memberCopy);

      const response = await axios.post(
        `http://localhost:5500/group/addgroup`,
        {
          name: groupName,
          members: memberCopy,
          admin: userId,
        }
      );
      console.log("RESPO", response);
      const newGroup = response.data;
      setGroupList((prev) => [...prev, newGroup]);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCurrentGroup = async (group) => {
    setCurrentGroup(group);
    try {
      const response = await axios.get(
        `http://localhost:5500/groupChat/groupMsg?groupId=${group._id}`
      );
      const groupMsg = response.data.groupMsg;
      setChatMsg(groupMsg);
      console.log("M", groupMsg);
    } catch (err) {
      console.log(err);
    }
  };

  const stringAvatar = (name) => {
    // console.log("name", name);
    if (!name) return;
    return {
      children: `${name.split("")[0][0].toUpperCase()}`,
    };
  };
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5500/group/getgroup?admin=${userId}`)
        .then((response) => {
          const { data } = response;

          setGroupList(data.userGroupChat);
        });
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  const handleOpen = () => {
    setOpen(true);
    getContactList();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BottomNavigationAction
        style={{ float: "right" }}
        label="person"
        value="person"
        onClick={handleOpen}
        icon={
          <GroupsIcon
            style={{
              fontSize: "2.2rem",
              border: "1px solid #bdbdbd",
              backgroundColor: "#bdbdbd",
              color: "#fff",
              borderRadius: "50%",
              padding: "4px",
            }}
          />
        }
      />

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
            <input
              type="text"
              required
              className="group-input"
              placeholder="Group Subject"
              onChange={(e) => setGroupName(e.target.value)}
            />
            {contactList &&
              contactList.map(({ contact }, index) => {
                return (
                  <div key={index}>
                    <ListItem
                      style={{ alignItems: "center", paddingLeft: "0" }}
                      alignItems="flex-start"
                    >
                      <Checkbox
                        onChange={(e) =>
                          addMembers(e, contact.username, contact.id)
                        }
                      />
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
                    <Divider
                      style={{ listStyle: "none" }}
                      variant="inset"
                      component="li"
                    />
                  </div>
                );
              })}
            <button className="group-btn" onClick={() => createGroup()}>
              New group
            </button>
          </Box>
        </Fade>
      </Modal>
      {console.log("grpList", groupList)}
      {groupList.map((group, index) => {
        return (
          <div>
            <div key={index} className="one-chat">
              <ListItem
                alignItems="flex-start"
                onClick={() => handleCurrentGroup(group)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    {...stringAvatar(group.name)}
                  />
                </ListItemAvatar>
                <ListItemText primary={group.name} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupChat;
