import React, { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { SendMoney } from "./SendMoney";

export const Dashboard = () => {
 
  const [balance, setBalance] = useState("");
 
  const getBalanceUrl = `${process.env.BACKEND_URL}/account/balance`;

  const bearerToken = "Bearer " + localStorage.getItem("token");

  useEffect(() => {
    axios.get(getBalanceUrl, {headers: { Authorization: bearerToken,},})
      .then((response) => setBalance(response.data.balance));
  }, []);
  return (
    <div>
      <AppBar></AppBar>
      <Balance value={balance}></Balance>
      <Users></Users>
    </div>
  );
};
