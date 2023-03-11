import React from "react";
import NotFoundImg from "../Assets/404.svg";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-1">
      <img
        src={`${NotFoundImg}`}
        alt=""
        style={{ height: "80vh", width: "80vh", padding: "2rem 0 0 0" }}
      />
    </div>
  );
};

export default NotFound;