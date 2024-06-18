import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// require("dotenv").config();

export const Signin = () => {
  const signinUrl = `${process.env.BACKEND_URL}/user/signin`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInState, setSignInState] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[90%] text-center p-2 px-4">
          <Heading label={"Sign In"}></Heading>
          <SubHeading
            label={"Enter your credentials to access your account"}
          ></SubHeading>

          <InputBox
            label={"Email"}
            placeholder={"abc@gmail.com"}
            onChange={(e) => setUsername(e.target.value)}
          ></InputBox>
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            onChange={(e) => setPassword(e.target.value)}
          ></InputBox>
          <div className="mt-6">
            <Button
              label={"Sign In"}
              onClick={async () => {
                try {
                  const response = await axios.post(signinUrl, {
                    username,
                    password,
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  console.log("Error", error.response.data.message);
                  setSignInState(true);
                }
              }}
            ></Button>
          </div>
          {signInState ? (
            <BottomWarning
              label={"The id/password combination is incorrect"}
            ></BottomWarning>
          ) : null}
          <div className="mt-6">
            <BottomWarning
              label={"Dont have an account?"}
              buttonText={"Sign Up"}
              to={"/signup"}
            ></BottomWarning>
          </div>
        </div>
      </div>
    </div>
  );
};
