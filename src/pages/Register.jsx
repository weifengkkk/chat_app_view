import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../api/ApiRoutes";
import axios from "axios";
import { Buffer } from "buffer";
import bgImage from "../assets/background.png";

function Register() {
  const navigate = useNavigate();
  const toastOption = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    theme: "pink",
    draggable: true,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error("this username have used!", toastOption);
      } else {
        toast.success(
          `congradualtion ${data.user.name} you have created a new account!`,
          toastOption
        );
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, confirmpassword } = values;
    if (password !== confirmpassword) {
      toast.error(
        "password and confirmpassword should be same, plase input again!",

        toastOption
      );
      return false;
    } else if (password.length < 3 || password.length > 20) {
      toast.error("password length < 3 or password length > 8", toastOption);
    } else {
      return true;
    }
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h3>Register Page</h3>
          </div>
          <input
            type="text"
            name="username"
            placeholder="input your name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="input your password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="confirm your password"
            onChange={(e) => handleChange(e)}
          />
          <button className="submit-btn" type="submit">
            Register
          </button>
          <span>
            Already have another account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-image: url(${bgImage});
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 5rem;
      margin-right: 2rem;
    }
  }
  form {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: pink;
    border: 0.1rem solid black;
    border-radius: 2rem;
    padding: 3rem 5rem;
    h3 {
      color: grey;
    }
    input {
      height: 3rem;
      padding: 1rem;
      border: solid 0.1rem grey;
      border-radius: 1rem;
    }
    .submit-btn {
      background-color: pink;
      color: grey;
      width: 10vw;
      height: 5vh;
      padding: 1rem, 2rem;
      margin-left: 3rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: white;
      }
    }
  }
`;
export default Register;
