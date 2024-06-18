import React from "react";

export const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-customsm font-medium text-left py-2"> {label}</div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded border-slate-200 focus:outline-none"
      ></input>
    </div>
  );
};
