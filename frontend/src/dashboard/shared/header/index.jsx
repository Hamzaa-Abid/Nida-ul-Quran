import React, { useEffect, useState, useFocus, useRef } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import msgIcon from "../../../assets/images/msg-icon.png";
import notificationIcon from "../../../assets/images/notification-icon.png";
import Landing from "../../tutor/components/Landing/Landing";
import Chat from "../../shared/chat/index";
import alerticon from "../../../assets/images/active-icon.png";
import profileIcon from "../../../assets/images/profile-img.png";
import getUserInfo from "../../../shared/Helpers/getUserInfo";
import * as types from "../../../store/Actions/Types";
import SocketHandler from "../../../shared/Helpers/socket";
import axiosInstance from "../../../axios";
import { Tabs, Empty, message, Modal, Spin } from "antd";
// import { socketInitAction } from "../../../store/Actions";
// import { establishConnection } from "../../../shared/Helpers/socket";
import _ from "underscore";
const { TabPane } = Tabs;
const Header = (props) => {
  const [isUserRole, setUserRole] = useState("");
  const [isUserInfo, setUserInfo] = useState("");
  const [messages, setMessages] = useState("");
  const [isMsgNotif, setisMsgNotif] = useState(false);
  const [Socket, setSocket] = useState(null);
  const [newMsg, setNewMsg] = useState(false);
  const [emptyMsg, setEmptyMsg] = useState(true);
  const [senderId, setSenderId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [openNotif, setNotif] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const [notificationBeep, setNotificationBeep] = useState(false);
  const audio = new Audio("/beep.mp3");

  const notificationRef = React.useRef(null);
  let history = useHistory();
  let { path } = useRouteMatch();
  let user = useSelector((state) => state.studentProfileReducer);
  let dispatch = useDispatch();
  let data = useSelector((state) => state.socketReducer.data);
  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
      setUserRole(res.userRole);
      setTeacherId(res.loginId);
      console.log("response!!!", res);
      console.log("Teacher id", res.loginId);
      //   let socketData = establishConnection(res);
      //   console.log("SOCKET INSIDE HEADER !!!", socketData);
      // dispatch(socketInitAction('SOCKET_INIT', socketData));
      //   console.log("socker initiated !!!", socketData);
    });
  }, []);

  const messageListener = (Socket) => {
    Socket.on("messageSent", (message) => {
      //messageSent is event name
      let newMessage = message;
      setMessages(newMessage.message);
      audio.play();
      setisMsgNotif(true);
      setEmptyMsg(true);
      setSenderId(newMessage.senderId);
      newMessage = [];
    });
  };

  const notificationListener = (Socket) => {
    console.log("this is notification");
    Socket.on("notification", (notification) => {
      let newNotification = notification;
      console.log("This is notification", newNotification);

      let newNotificationList = [
        {
          message: newNotification.message,
          isRead: newNotification.isRead,
          type: newNotification.type,
          _id: newNotification._id,
          url: newNotification.url,
          userID: newNotification.userID,
        },
        ...notificationRef.current,
      ];
      audio.play();
      console.log("Helloo", newNotificationList);
      setNotifications(newNotificationList);
      setNotificationBeep(true);
      console.log("Line 82", notificationRef.current);
    });
  };

  const getNotifications = async () => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    axiosInstance
      .get("/get-notifications/", {
        headers: {
          authorization: myToken,
        },
      })
      .then((res) => {
        console.log("this is notification array", res.data.data);
        //setNotifications(res.data.data.splice(0, 10));s
        
      
        setNotifications(res.data.data)
        {
          /*}
        let counter = res.data.data.splice(0, 10);
        counter.forEach((item) => {
          if (item.isRead === false) {
            setNotifCounter(item);
          }
        }); {*/
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const markReadNotification = () => {
    const token = localStorage.getItem("token");
    const myToken = JSON.parse(token);
    setIsRead(true);
    let data = {
      isRead: isRead,
      id: notificationId,
    };
    console.log("Line 92", data);
    axiosInstance.post("/mark-notification", data, {
      headers: {
        authorization: myToken,
      },
    });
  };

  const openMsg = () => {
    setNewMsg(true);
    newMsg === false ? setNewMsg(true) : setNewMsg(false);
  };
  const openEmptyMsg = () => {
    setEmptyMsg(false);
    emptyMsg === false ? setEmptyMsg(true) : setEmptyMsg(false);
  };

  const gotoChat = () => {
    history.push({
      pathname: isUserRole === "tutor" ? "/tutor/chat" : "/student/chat",
      sender: senderId,
    });
    setNewMsg(false);
    setisMsgNotif(false);
  };

  useEffect(() => {
    notificationRef.current = notifications;
  }, [JSON.stringify(notifications)]);

  useEffect(() => {
    setSocket(data);
    getNotifications();
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
      <SocketHandler info={isUserInfo && isUserInfo} />
      <header
        id="student-header"
        className={props.toggle ? "collapse-header" : ""}
      >
        <div className="container-fluid">
          <div className="student-header-content clearfix">
            <div className="student-header-left">
              <div className="student-header-btn">
                <ul>
                  <li className="active">
                    <a onClick={() => history.push("/")}>Home</a>
                  </li>
                  {/* <li><a href="#">Plans & Pricing</a></li> */}
                  <li>
                    <a
                      onClick={() =>
                        history.push(
                          `/home/find-${
                            isUserRole === "tutor" ? "student" : "tutor"
                          }`
                        )
                      }
                    >
                      Find &nbsp;{" "}
                      {isUserRole === "tutor" ? "students" : "tutors"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="student-header-right">
              <div className="student-header-others">
                <ul style={{ position: "relative" }}>
                  <li>
                    <div className="search-bar">
                      <input type="text" placeholder="Search..." />
                      <button type="button"></button>
                    </div>
                  </li>

                  {isMsgNotif === true ? (
                    <li className="message">
                      <a href="#">
                        <img src={msgIcon} alt="" onClick={openMsg} />
                        <i className="alert"></i>
                      </a>
                    </li>
                  ) : (
                    <li className="message">
                      <a href="#">
                        <img src={msgIcon} alt="" onClick={openEmptyMsg} />
                      </a>
                    </li>
                  )}
                  {newMsg === true ? (
                    <div className="header-dropdown-message">
                      <li onClick={gotoChat} className="">
                        <p style={{ cursor: "pointer" }}> {messages} </p>
                      </li>
                    </div>
                  ) : null}

                  {emptyMsg === false ? (
                    <div className="header-dropdown-message">
                      <li>
                        <p style={{ cursor: "pointer" }}>No messages</p>
                      </li>
                    </div>
                  ) : null}

                  {notificationBeep === false ? (
                    <li className="notification">
                      <a href="#">
                        <img
                          src={notificationIcon}
                          alt=""
                          onClick={() =>
                            openNotif === false
                              ? setNotif(true)
                              : setNotif(false)
                          }
                        />
                      </a>
                      {openNotif === true ? (
                        <ul className="header-dropdown">
                          <li className="notification-title">
                            <h6>Notifications</h6>
                          </li>
                          {notifications.map((item) => {
                            if (item.isRead === false) {
                              return (
                                <li
                                  style={{
                                    display: "flex",
                                    backgroundColor: "skyblue",
                                  }}
                                  onClick={() => {
                                    setNotificationId(item._id);
                                    markReadNotification();
                                    if (item.type == 1) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab1",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 2) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab2",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 3) {
                                      history.push({
                                        pathname: `${path}`,
                                      });
                                      setNotif(false);
                                    }
                                  }}
                                >
                                  {item.message}
                                </li>
                              );
                            } else {
                              return (
                                <li
                                  style={{
                                    display: "flex",
                                  }}
                                  onClick={() => {
                                    setNotificationId(item._id);
                                    markReadNotification();
                                    if (item.type == 1) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab1",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 2) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab2",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 3) {
                                      history.push({
                                        pathname: `${path}`,
                                      });
                                      setNotif(false);
                                    }
                                  }}
                                >
                                  {item.message}

                                  {/*}
                                
                                  {item.type === 1
                                    ? "Your class is about to begin in 10mins"
                                    : item.type === 2
                                    ? "You have a connection request"
                                  : "Connection Request is accepted"} {*/}
                                </li>
                              );
                            }
                          })}
                        </ul>
                      ) : null}
                    </li>
                  ) : (
                    <li className="notification">
                      <a href="#">
                        <img
                          src={notificationIcon}
                          alt=""
                          onClick={() =>
                            openNotif === false
                              ? setNotif(true)
                              : setNotif(false)
                          }
                        />
                        <i className="alerts"></i>
                      </a>
                      {openNotif === true ? (
                        <ul className="header-dropdown">
                          <li className="notification-title">
                            <h6>Notifications</h6>
                          </li>
                          {notifications.map((item) => {
                            if (item.isRead === false) {
                              return (
                                <li
                                  style={{
                                    display: "flex",
                                    backgroundColor: "skyblue",
                                  }}
                                  onClick={() => {
                                    setNotificationId(item._id);
                                    markReadNotification();
                                    if (item.type == 1) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab1",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 2) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab2",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 3) {
                                      history.push({
                                        pathname: `${path}`,
                                      });
                                      setNotif(false);
                                    }
                                  }}
                                >
                                  {item.message}
                                  {/*}
                                  {item.type === 1
                                    ? "Your class is about to begin in 10mins"
                                    : item.type === 2
                                    ? "You have a connection request"
                                  : "Connection Request is accepted"} {*/}
                                </li>
                              );
                            } else {
                              return (
                                <li
                                  style={{ display: "flex" }}
                                  onClick={() => {
                                    setNotificationId(item._id);
                                    markReadNotification();
                                    if (item.type == 1) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab1",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 2) {
                                      history.push({
                                        pathname: `${path}`,
                                        tab: "tab2",
                                      });
                                      setNotif(false);
                                    } else if (item.type == 3) {
                                      history.push({
                                        pathname: `${path}`,
                                      });
                                      setNotif(false);
                                    }
                                  }}
                                >
                                  {item.message}
                                </li>
                              );
                            }
                          })}
                        </ul>
                      ) : null}
                    </li>
                  )}

                  <li>
                    <div className="user-section">
                      <a href="#">
                        <span>
                          <img src={user.photo} alt="" />
                        </span>
                      </a>
                      <div className="user-dropdown">
                        <ul>
                          <li>
                            <a href="#">Logout</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
