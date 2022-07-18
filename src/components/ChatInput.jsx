import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
export default function ChatInput({ handleSendMsg }) {
  const [showImojiPicker, setShowImojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowImojiPicker(!showImojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showImojiPicker && (
              <Picker onEmojiClick={handleEmojiClick}></Picker>
            )}
          </div>
        </div>
        <form className="input-container" onSubmit={sendChat}>
          <input
            type="text"
            placeholder="input message here"
            onChange={(e) => setMsg(e.target.value)}
            onClick={() => {
              setShowImojiPicker(false);
            }}
            value={msg}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #ffffffef;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: grey;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: grey;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #ffffffef;
        box-shadow: 0 5px 10px pink;
        border-color: pink;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #ffffffef;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #ffffffef;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: gray;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: pink;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
