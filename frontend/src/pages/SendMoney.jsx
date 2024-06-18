import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SubHeading } from "../components/SubHeading";
// require("dotenv").config();

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amountToBeSent, setAmountToBeSent] = useState(0);
  const transferUrl = `${process.env.BACKEND_URL}/account/transfer`;
  const bearerToken = "Bearer " + localStorage.getItem("token");
  const [popUpState, setPopUpState] = useState(false);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const usePopUp = (redirectTo) => {
    setPopUpState(true);
    setTimeout(() => {
      setPopUpState(false);
      redirectTo("/dashboard");
    }, 5000);
  };
  return (
    <div className="bg-gray-100 h-screen flex justify-center ">
      <div className="flex flex-col basis-[360px] justify-center">
        <div className="rounded-lg bg-white  w-[100%] text-center p-2 h-[80%] px-4 shadow-md flex flex-col justify-center gap-10">
          <div className="flex flex-col justify-center text-3xl font-bold ">
            Send Money
          </div>
          <div className="flex flex-col justify-evenly gap-3">
            <div className="flex flex-row justify-start gap-3">
              <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center text-xl h-full text-white">
                  {name[0]}
                </div>
              </div>
              <div className="flex flex-col justify-center text-xl font-semibold">
                {name}
              </div>
            </div>
            <div>
              <InputBox
                label={"Amount (in Rs)"}
                placeholder={"Enter amount"}
                onChange={(e) => setAmountToBeSent(parseInt(e.target.value))}
              ></InputBox>

              {popUpState ? (
                <div className="flex flex-row justify-center pt-2">
                  <SubHeading
                    label={`${message}Redirecting back to the dashboard..`}
                  ></SubHeading>
                </div>
              ) : null}

              <button
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      transferUrl,
                      { to: id, amount: amountToBeSent },
                      {
                        headers: {
                          Authorization: bearerToken,
                        },
                      }
                    );
                    setMessage("Transfer successful!");
                    console.log(message);
                    usePopUp(navigate);
                    // raisePopUp();
                  } catch (error) {
                    console.log("Error", error.response);
                    setMessage("Transfer unsuccessful!");
                    setPopUpState(true);
                    usePopUp(navigate);
                    // raisePopUp();
                  }
                }}
                type="button"
                className=" w-full text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-[100px] me-2 mb-2"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
