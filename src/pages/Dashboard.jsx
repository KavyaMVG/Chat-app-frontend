import React, { useEffect, useState } from "react";

import "./Dashboard.css";
import Chats from "../components/Chats";
import ChatWindow from "../components/ChatWindow";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState({});
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (!(localStorage.getItem("auth") && localStorage.getItem("id"))) {
      navigate("/login");
    }
  }, [navigate]);






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
