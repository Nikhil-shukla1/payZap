import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// require("dotenv").config();

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpState, setSignUpState] = useState(false);
  const signUpUrl = `${process.env.BACKEND_URL}/user/signup/`;
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[90%] text-center p-2 h-auto px-4">
          <Heading label={"Sign Up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Email"}
            placeholder={"abc@gmail.com"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
          <div className="mt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(signUpUrl, {
                    username,
                    password,
                    firstName,
                    lastName,
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Error", error.response.data.message);
                  //   alert(error.response.data.message);
                  setSignUpState(true);
                }
              }}
              label={"Sign Up"}
            ></Button>
          </div>
          {signUpState ? (
            <BottomWarning
              label={
                "The email id is already taken.Please use a different id or signin"
              }
              to={"/signin"}
            ></BottomWarning>
          ) : null}

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};
