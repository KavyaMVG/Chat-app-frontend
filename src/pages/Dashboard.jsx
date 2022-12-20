import React, { useEffect, useState } from "react";

import "./Dashboard.css";
import Chats from "../components/Chats";
import ChatWindow from "../components/ChatWindow";
import { useLocation, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [receiver, setReceiver] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  console.log("loc",location.state)
  const firstName = location.state.data.firstname
  console.log("firstname", firstName)

  useEffect(() => {
    if (!(localStorage.getItem("auth") && localStorage.getItem("id"))) {
      navigate("/login");
    }
  }, [navigate]);






  return (
    <div className="main-page">
      <Chats setReceiver={setReceiver} setChatMessages={setChatMessages} firstName={firstName} />
      <ChatWindow
        receiver={receiver}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default Dashboard;
