import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
  const getUsersUrl = "http://localhost:3000/api/v1/user/bulk?filter=";
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(getUsersUrl + filter)
      .then((response) => setUsers(response.data.users));
  }, [filter]);

  return (
    <div>
      <div className="font-bold mt-6 text-lg ml-10">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-[93%] px-2 py-1 mx-10 border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none"
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div className="bg-slate-100">
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};
export const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mt-5">
      <div className="flex ml-10">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full pr-5 mr-5">
        <Button
          label={"Send Money"}
          onClick={() =>
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
          }
        ></Button>
      </div>
    </div>
  );
};
