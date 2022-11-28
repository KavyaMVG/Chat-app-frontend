import React, { useState } from "react";

import "./Dashboard.css";
import Chats from "../components/Chats";
import ChatWindow from "../components/ChatWindow";

const Dashboard = () => {
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");

  // const userContact = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userId = localStorage.getItem("id");
  //     console.log("iid", userId);
  //     const res = await axios.post("http://localhost:5500/contacts/add", {
  //       userId,
  //       email,
  //       username,
  //     });
  //     if (res.status === 201) {

  //       setContactLists(prev => [...prev,{
  //         userId,
  //         email,
  //         username
  //       }]);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     // if (err.response) setErrorMessage(err.response.data.msg);
  //   }
  // };
  const [receiver, setReceiver] = useState({});
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="main-page">
      <Chats setReceiver={setReceiver} setChatMessages={setChatMessages} />
      <ChatWindow
        receiver={receiver}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default Dashboard;
