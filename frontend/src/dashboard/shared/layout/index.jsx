import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../header";
import SideBar from "../sidebar";
import Footer from "../footer";
import CurrentStatus from "../currentStatus";
import { ToastContainer, toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
import { useSelector } from "react-redux";

const StudentLayout = (props) => {
  const [isToggle, setToggle] = useState(false);
  const [isRole, setUserRole] = useState("");
  const [Socket, setSocket] = useState(null);
  let data = useSelector((state) => state.socketReducer.data);
  const getUserInfo = async () => {
    const info = await localStorage.getItem("userInfo");
    console.log("_INFO_", JSON.parse(info).userRole);
    const role = JSON.parse(info).userRole;
    setUserRole(role);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const messageListener = (Socket) => {
    Socket.on("messageSent", (message) => {
      let newMessage = message;

      // console.log('This is header page', newMessage.message)

      toast.info("You have a new message", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      newMessage = [];
    });
  };

  const notificationListener = (Socket) => {
    Socket.on("notification", (notification) => {
      let newNotification = notification;

      // console.log('This is header page', newMessage.message)

      toast.info("You have a new Notification", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      newNotification = [];
    });
  };
  useEffect(() => {
    setSocket(data);
    console.log("Step 3 !! ", data.id);
    if (!_.isEmpty(data)) {
      console.log("Step 4 !! ", Socket);
      messageListener(data);
      notificationListener(data);
      console.log("Step socket", Socket);
    }
  }, [data]);
  return (
    <>
      <Header toggle={!isToggle} />
      <SideBar toggleMenu={() => setToggle(!isToggle)} />
      <div className={isToggle ? "menu" : "collapse-menu"}>
        <CurrentStatus name={isRole} />
        {props.children}
      </div>
      <ToastContainer />
      <Footer toggle={!isToggle} />
    </>
  );
};

export default StudentLayout;
