import React, { useEffect, useState } from "react";
import "./style.css";
import axiosInstance from "../../../../axios";
import { Empty } from "antd";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import moment from 'moment';
import _ from "underscore";

import Image from "../../../../assets/images/image.jpg";
import userimage from "../../../../assets/images/userimg.jpg";
import dots from "../../../../assets/images/dots.png";
import PhoneIcon from "../../../../assets/images/phone-icon.png";
import CallIcon from "../../../../assets/images/videocall-icon.png";

const StudentChat = () => {
  const [studentContactList, setStudentContactList] = useState([]);
  const [filterContactList, setFilterContactList] = useState([]);
  const [studentChatData, setStudentChatData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCurrentUserId, setUserId] = useState(null);
  const [Socket, setSocket] = useState(useSelector((state) => state.socketReducer.data));
  const [isUserMessage, setUserMessage] = useState("");
  const [isReceiveMessage, setReceiveMessage] = useState("");
  const [response, setResponse] = useState("");
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);

  let data = useSelector((state) => state.socketReducer.data);

  const selectedUserHandler = (user) => {
    setStudentChatData([]);
    setSelectedUser(user.userId);
    fetchSelectedContactMessages(user.userId);
    setSelectedUserInfo(user);
    scrollToBottom();
  };

  const messageHandler = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessageOnClick = () => {
    console.log("user Message", isUserMessage, selectedUser);
    setStudentChatData((oldMessages) => [
      ...oldMessages,
      {
        message: isUserMessage,
        receiverId: selectedUser,
        senderId: isCurrentUserId,
        createdAt: new Date(),
      },
    ]);
    Socket.emit("newMessage", {
      receiverId: selectedUser,
      message: isUserMessage,
      senderId: isCurrentUserId,
      role: "student",
    });
    setUserMessage("");
    scrollToBottom();
  };

  const sendMessageHandler = (e) => {
    if (e.key === "Enter") {
      console.log("user Message", isUserMessage, selectedUser);
      setStudentChatData((oldMessages) => [
        ...oldMessages,
        {
          message: isUserMessage,
          receiverId: selectedUser,
          senderId: isCurrentUserId,
          createdAt: new Date(),
        },
      ]);
      Socket.emit("newMessage", {
        receiverId: selectedUser,
        message: isUserMessage,
        senderId: isCurrentUserId,
        role: "student",
      });
      setUserMessage("");
      scrollToBottom();
    }
  };

  const messageListner = (Socket) => {
    Socket.on("messageSent", (message) => {
      console.log("----------- received Message", message);
      let newMessage = message;
      setStudentChatData((oldMessages) => [...oldMessages, newMessage]);
      newMessage = [];
    });
  };

  const fetchTeacherContactList = async () => {
    try {
      const getTeacherContacts = await axiosInstance.get("students/student");
      console.log("----", getTeacherContacts.data.data);
      setStudentContactList(getTeacherContacts.data.data);
      setFilterContactList(getTeacherContacts.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchSelectedContactMessages = async (id) => {
    try {
      const messages = await axiosInstance.get(
        `messages?chatWithId=${id}&userId=${isCurrentUserId}`
      );
      const data = messages.data.data;
      data.sort(function (a, b) {
        return a.createdAt - b.createdAt;
      });
      console.log("CHAT DATA IS", messages.data.data);
      setStudentChatData(data);
    } catch (error) {
      console.log("error in getting messages data", error);
    }
  };

  // const socketInit = (userId) => {
  //   socket.on("connect", () => {
  //     console.log(socket.id);
  //     socket.emit("userUpdate", { socketId: socket.id, userId, role: "tutor" });
  //   });
  // };

  // const setSocketHandler = async () => {
  //   console.log("hamza");
  //   const ENDPOINT = "https://qtutor.azurewebsites.net/";
  //   socket = socketIOClient(ENDPOINT);
  //   setSocket(socket);
  //   console.log(socket, "<<<SOCKET");
  //   const userInfo = await localStorage.getItem("userInfo");
  //   await setUserId(JSON.parse(userInfo).loginId);
  //   // socketInit(JSON.parse(userInfo).loginId);
  // };

  const setUserIDHandler = async () => {
    const userInfo = await localStorage.getItem("userInfo");
    await setUserId(JSON.parse(userInfo).loginId);
  };

  useEffect(() => {
    console.log("socketData!!!", Socket);
    setUserIDHandler();
    fetchTeacherContactList();
  }, []);

  const searchContach = (e) => {
    console.log(e.target.value, "<<<<");
    let searched = e.target.value;
    const filtered = studentContactList.filter((contact) => {
      if (searched.length)
        return (
          contact.username.toLowerCase().indexOf(searched.toLowerCase()) !== -1
        );
      return studentContactList;
    });
    console.log(filtered);
    setFilterContactList(filtered);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const section = document.querySelector("#chatRef");
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1000);
  };

  useEffect(() => {
    setSocket(data);
    console.log("Step 3 !! ", data.id);
    if (!_.isEmpty(data)) {
      // alert('y')
      console.log("Step 4 !! ", Socket);
      messageListner(data);
      console.log("Step socket", Socket);
    }
  }, [data]);

  return (
    data &&
    <>
      ID: {Socket && Socket.id}
      <div className="messages-page clearfix">
        <div className="contacts-wrap">
          <div className="searchwrap">
            <input
              type="search"
              placeholder="Search"
              onChange={searchContach}
            />
            <button type="button"></button>
          </div>
          <div className="contacts-listing">
            <div className="scrollbar">
              <div className="overflow">
                <ul>
                  {studentContactList.length > 0 ? (
                    filterContactList.map((contact) => (
                      <>
                        <li
                          key={contact.username}
                          className={
                            selectedUser === contact.userId
                              ? "activeContact"
                              : ""
                          }
                          onClick={() => selectedUserHandler(contact)}
                        >
                          <a href="#" className="clearfix">
                            <div className="imgwrap">
                              <img src={contact.profileImage} alt="Image" />
                            </div>
                            <div className="contactdetail">
                              <h4>{contact.username}</h4>
                              <p>Assalamu Allaikum.....</p>
                              <span>9:00 PM</span>
                            </div>
                            {/* <div className="messagecount">
                              <em>
                                <i>1</i>
                              </em>
                            </div> */}
                          </a>
                        </li>
                      </>
                    ))
                  ) : (
                      <li>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span>No record found</span>}
                        />
                      </li>
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="chatbox-wrap">
          {selectedUser ? (
            <>
              <div className="chatbox-head clearfix">
                <div className="chathead-left">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flext-start",
                      alignItems: "center",
                    }}
                  >
                    <div className="msg-img">
                      <img
                        src={selectedUserInfo.profileImage}
                        alt=""
                        style={{
                          display: "inline-block",
                          borderRadius: "100px",
                          marginRight: "10px",
                        }}
                        width="30px"
                        height="30px"
                      />
                    </div>
                    <h5>{selectedUserInfo.username}</h5>
                  </div>
                  <span>Online</span>
                </div>
                <div className="chathead-right">
                  <ul>
                    <li>
                      <a href="#" className="bluebox">
                        <img src={PhoneIcon} alt="1" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="greenbox">
                        <img src={CallIcon} alt="2" />
                      </a>
                    </li>
                    <li>
                      <a href="#chathead-dropdown" className="dots dropbtn">
                        <img src={dots} alt="" />
                      </a>
                      <div className="dropdown" id="chathead-dropdown">
                        <div className="dropdown-content">
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="chatarea">
                <div className="scrollbar" id="scrollbottom">
                  <div className="overflow">
                    <div className="chat clearfix">
                      {studentChatData.length > 0 ? (
                        studentChatData.map((chat, i) => (
                          <div key={i}>
                            {chat.receiverId === isCurrentUserId ? (
                              <div key={i + "student"} className="outgoingmsgs">
                                <ul>
                                  <li className="clearfix">
                                    <div className="msg-detail">
                                      <div className="msg-wrap">
                                        <p>{chat.message}</p>
                                      </div>
                                      {/* (<Moment calendar={calendarStrings}><span>{chat.createdAt} &nbsp; </span> </Moment>) */}
                                      {moment(chat.createdAt).format('lll')}
                                    </div>
                                    {/* <div className="msg-img">
                                      <img src={userimage} alt="" />
                                    </div> */}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                                <div key={i + "tutor"} className="incomingmsgs">
                                  <ul>
                                    <li>
                                      {/* <div className="msg-img">
                                      <img src={Image} alt="" />
                                    </div> */}
                                      <div className="msg-detail">
                                        <div className="msg-wrap">
                                          <p>{chat.message}</p>
                                        </div>
                                        {/* (<Moment calendar={calendarStrings}><span>{chat.createdAt}&nbsp;</span></Moment>) */}
                                        {moment(chat.createdAt).format('lll')}
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              )}
                          </div>
                        ))
                      ) : (
                          <Empty description={false} />
                        )}
                    </div>
                    <div id="chatRef" />
                  </div>
                </div>

                <div className="typemsg">
                  <input
                    type="text"
                    placeholder="Type your message....."
                    value={isUserMessage}
                    onChange={messageHandler}
                    disabled={!selectedUser}
                    onKeyDown={sendMessageHandler}
                  />
                  <button
                    type="button"
                    onClick={sendMessageOnClick}
                    disabled={!isUserMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>No record found</span>}
                imageStyle={{
                  height: 660,
                }}
              />
            )}
        </div>
      </div>
    </>
  );
};

export default StudentChat;
