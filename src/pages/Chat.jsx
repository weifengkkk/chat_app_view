import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import bg_image from "../assets/background.png";
import { useNavigate } from "react-router-dom";
import { getAllUsersRoute, host } from "../api/ApiRoutes";
import axios from "axios";
import { io } from "socket.io-client";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const redirect = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContacts, setShowContacts] = useState(true);
  const changeWindow = (flag) => {
    setShowContacts(flag);
  };
  const getUser = async () => {
    const user = localStorage.getItem("chat-app-user");
    if (user) {
      await setCurrentUser(JSON.parse(user));
      setIsLoaded(true);
    } else {
      redirect("/login");
    }
  };
  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${getAllUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        redirect("/setAvatar");
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getContacts();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          {showContacts ? (
            <Contacts
              setShowContacts={changeWindow}
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            ></Contacts>
          ) : isLoaded && currentChat ? (
            <ChatContainer
              closeWindow={changeWindow}
              socket={socket}
              currentChat={currentChat}
            ></ChatContainer>
          ) : (
            <Welcome currentUser={currentUser}></Welcome>
          )}
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: url(${bg_image});
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    /* @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    } */
  }
`;

export default Chat;
