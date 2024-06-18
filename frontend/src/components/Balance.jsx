import React from "react";

export const Balance = ({ value }) => {
  return (
    <div className="flex flex-row w-full h-10  justify-start items-center">
      <div className="flex pl-4">
        <div className="font-bold text-lg">Your balance :</div>
        <div className="font-semibold text-lg ml-2"> Rs.{value}</div>
      </div>
    </div>
  );
};
