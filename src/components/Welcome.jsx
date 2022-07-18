import styled from "styled-components";
import welcome from "../assets/welcome.gif";
export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={welcome} alt="" />
      <h1>
        Welcome!
        <span>{currentUser !== undefined ? currentUser.username : "host"}</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff97;

  img {
    margin-bottom: 2rem;
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
