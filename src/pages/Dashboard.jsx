import React, { useEffect } from "react";

import "./Dashboard.css";
import Chats from "../components/Chats";
import ChatWindow from "../components/ChatWindow";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!(localStorage.getItem("auth") && localStorage.getItem("id"))) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="main-page">
      <Chats />
      <ChatWindow />
    </div>
  );
};

export default Dashboard;
