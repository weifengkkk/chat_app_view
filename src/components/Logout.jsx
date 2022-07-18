import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    await localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #f38686;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
