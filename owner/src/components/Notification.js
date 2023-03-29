import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { onMessageListener } from "../firebase";
const Notification = () => {
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    image: "",
  });
  const CustomToast = (props) => {
    const { title, body, image } = props?.notification;
    console.log("====", props.notification);
    return (
      <div className="flex items-center">
        {image != "" && (
          <div className="rounded-l-lg p-2">
            <img
              src={image}
              alt="Your Image"
              className="hidden w-10 h-10 rounded-full"
            />
          </div>
        )}
        <div className="p-2">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-500">{body}</p>
        </div>
      </div>
    );
  };
  const showToast = (data) => {
    toast(<CustomToast notification={data} />, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  useEffect(() => {
    if (notification?.title) {
      showToast(notification);
      document.title = "Owner - 1 new notification";
      setTimeout(() => {
        document.title = "Owner";
      }, 2000);
    }
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      console.log("===notification recieved", payload);
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        image: payload?.notification?.image,
      });
    })
    .catch((err) => console.log("failed: ", err));

};

export default Notification;
