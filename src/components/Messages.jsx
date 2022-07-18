import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
export default function Messages({ messages, scrollRef }) {
  return (
    <Container>
      {messages.map((message) => {
        return (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content">
                <p>{message.messages}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: grey;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #049fffe8;
      color: white;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: whitesmoke;
    }
  }
`;
