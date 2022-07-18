import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../api/ApiRoutes";
export default function SetAvatar() {
  const api = "https://api.multiavatar.com/";
  const navigate = useNavigate();
  const { username } = JSON.parse(localStorage.getItem("chat-app-user"));
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const getImages = async () => {
    const data = [];
    for (let i = 0; i < 6; i++) {
      const image = await axios.get(`${api}/${Math.random() * 1000}`, {
        timeout: 3000,
      });

      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };
  const toastOption = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    theme: "pink",
    draggable: true,
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.warning("please choose an avatar", toastOption);
    } else {
      const { data } = await axios.post(setAvatarRoute, {
        username,
        isAvatarImageSet: true,
        avatarImage: avatars[selectedAvatar],
      });
      if (data.status === true) {
        toast.success("you set your Avatar successful!", toastOption);
        localStorage.setItem("chat-app-user", JSON.stringify(data.result));
        navigate("/");
      } else {
        toast.error("you failed to set your avatar");
      }
    }
  };
  useEffect(() => {
    getImages();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  });
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} className="loader" alt="" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>pick an avatar for you</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "seleted" : ""
                } `}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            confirm
          </button>
        </Container>
      )}

      <ToastContainer></ToastContainer>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: pink;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: grey;
      text-transform: capitalize;
    }
  }
  .avatars {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        width: 6rem;
      }
    }
    .seleted {
      border: 0.4rem solid grey;
    }
  }
  .submit-btn {
    background-color: orange;
    color: grey;
    width: 10vw;
    height: 5vh;
    padding: 1rem, 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: capitalize;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: white;
    }
  }
  .loader {
    height: 40vh;
    width: 40vw;
  }
`;
