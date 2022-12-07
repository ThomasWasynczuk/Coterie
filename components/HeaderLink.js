import React from "react";

const HeaderLink = ({ label, Icon, active, hidden = false }) => {
  return (
    <div
      className={`${
        hidden && "hidden md:inline-flex"
      } flex items-center cursor-pointer text-black/60 hover:text-black  ${
        active && "!text-black"
      }`}
    >
      <h4 className="text-sm">{label}</h4>
    </div>
  );
};

export default HeaderLink;
