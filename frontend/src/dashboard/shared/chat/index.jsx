import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import axiosInstance from "../../../axios";
import { useLocation } from "react-router-dom";
import { Empty, Spin } from "antd";
import socketIOClient from "socket.io-client";
import moment from "moment";
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
import { useSelector } from "react-redux";
import alerticon from "../../../assets/images/alert-icon.png";
import dots from "../../../assets/images/dots.png";
import PhoneIcon from "../../../assets/images/phone-icon.png";
import CallIcon from "../../../assets/images/videocall-icon.png";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
const Chat = (props) => {
  const userimage =
    "https://emeraldpsychiatry.com/wp-content/uploads/2018/05/dummy_players.png";

  const [userContactList, setContactList] = useState([]);
  const [filterContactList, setFilterContactList] = useState([]);
  const [studentChatData, setStudentChatData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCurrentUser, setUser] = useState(null);
  const [Socket, setSocket] = useState(null);
  const [isUserMessage, setUserMessage] = useState("");
  const [senderPath, setSenderPath] = useState("");
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [recieveMsg, setRecvMsg] = useState("");
  const [isNewMessage, setNewMessage] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [profileImg, setProfileImg] = useState([]);
  const location = useLocation();
  const audio = new Audio("/beep.mp3");
  //console.log('Location', location)

  useEffect(() => {
    setSenderPath(location.sender);
  }, [location]);
  let data = useSelector((state) => state.socketReducer.data);

  const selectedUserHandler = (user) => {
    setStudentChatData([]);
    setSelectedUser(user.userId);
    fetchSelectedContactMessages(user.userId);
    setSelectedUserInfo(user);
    scrollToBottom();
    setNewMessage(false);
    setChatOpen(true);
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
        senderId: isCurrentUser.loginId,
        createdAt: new Date(),
      },
    ]);

    Socket.emit("newMessage", {
      receiverId: selectedUser,
      message: isUserMessage,
      senderId: isCurrentUser.loginId,
      role: isCurrentUser.userRole === "tutor" ? "student" : "tutor",
    });

    //socket.emit use to send messagges
    setUserMessage("");
    studentChatData && scrollToBottom();
  };

  const sendMessageHandler = (e) => {
    if (e.key === "Enter" && isUserMessage.length > 0) {
      console.log("user message ", isUserMessage);
      console.log("Selected User", selectedUser);
      setStudentChatData((oldMessages) => [
        ...oldMessages,

        {
          message: isUserMessage,
          receiverId: selectedUser,
          senderId: isCurrentUser.loginId,
          createdAt: new Date(),
        },
      ]);
      Socket.emit("newMessage", {
        receiverId: selectedUser,
        message: isUserMessage,
        senderId: isCurrentUser.loginId,
        role: isCurrentUser.userRole === "student" ? "tutor" : "student",
      });
      setUserMessage("");
      studentChatData && scrollToBottom();
    }
  };
  //socket.emit - This method is responsible for sending messages.
  // socket.on - This method is responsible for listening for incoming messages.

  const messageListner = (Socket) => {
    console.log("hamad");
    Socket.on("messageSent", (message) => {
      let newMessage = message;
      console.log("This is new message object", newMessage);

      setStudentChatData((oldMessages) => [...oldMessages, newMessage]);
      setRecvMsg(newMessage.senderId);

      setNewMessage(true);
      audio.play();
      newMessage = [];

      studentChatData && scrollToBottom();
    });
  };

  const notificationListener = (Socket) => {
    console.log("this is notification");
    Socket.on("notification", (notification) => {
      let newNotification = notification;
      console.log("This is notification", newNotification);
    });
  };
  /*
  const extra = async (Socket) => {
    console.log("this is hammadnmjdndfnfnn");
    Socket.on("notification", data => {
      console.log("Data+++++++++++", data);
    });
  };
*/
  const fetchContactList = async (user) => {
    const token = await localStorage.getItem("token");
    const mytoken = JSON.parse(token);
    //console.log('My token', mytoken)
    setLoading(true);
    try {
      const getTeacherContacts = await axiosInstance.get(
        `/contact/allcontacts?loginId=${user.loginId}&role=${user.userRole}`,
        {
          headers: {
            authorization: mytoken,
          },
        }
      );
      console.log("----", getTeacherContacts.data.data);

      setContactList(getTeacherContacts.data.data);
      setFilterContactList(getTeacherContacts.data.data);
      const allChatContacts = getTeacherContacts.data.data;
      const userImg = allChatContacts.map((item) => item.profileImage);
      setProfileImg(userImg);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        toast.notify(
          "Request Timed out. Please check your internet connectivity"
        );
      }
    }
  };

  const fetchSelectedContactMessages = async (id) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);

    //console.log('My token', mytoken)
    setChatLoading(true);

    try {
      const messages = await axiosInstance.get(
        `messages?chatWithId=${id}&userId=${isCurrentUser.loginId}`,
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      const data = messages.data.data;
      data.sort(function (a, b) {
        return a.createdAt - b.createdAt;
      });
      setStudentChatData(data);
      setChatLoading(false);
    } catch (error) {
      console.log("error in getting messages data", error);
    }
  };

  const setUserIDHandler = async () => {
    const userInfo = await localStorage.getItem("userInfo");
    await setUser(JSON.parse(userInfo));
    fetchContactList(JSON.parse(userInfo));
  };

  useEffect(() => {
    setUserIDHandler();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      const section = document.querySelector("#chatRef");
      if (section !== null) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 600);
  };

  // beep

  const searchContact = (e) => {
    let searched = e.target.value;

    const filtered = userContactList.filter((contact) => {
      if (searched.length > 0) {
        let search = searched.split(" ");
        console.log("Search", search);
        if (search.length > 0 && search[1] && search[1] != "") {
          return (
            contact.firstName.toLowerCase().indexOf(search[0].toLowerCase()) !==
              -1 &&
            contact.lastName.toLowerCase().indexOf(search[1].toLowerCase()) !==
              -1
          );
        }
        return (
          contact.firstName
            .toLowerCase()
            .indexOf(searched.trim().toLowerCase()) !== -1 ||
          contact.lastName.toLowerCase().indexOf(searched.toLowerCase()) !== -1
        );
      }

      return userContactList;
    });
    setFilterContactList(filtered);
  };

  useEffect(() => {
    setSocket(data);
    console.log("Step 3 !! ", data.id);
    if (!_.isEmpty(data)) {
      console.log("Step 4 !! ", Socket);
      messageListner(data);
      notificationListener(data);

      console.log("Step socket", Socket);
    }
  }, [data]);

  return data ? (
    <>
      <div className="messages-page clearfix">
        <div className="contacts-wrap">
          <div className="searchwrap">
            <input
              type="search"
              placeholder="Search Contacts"
              onChange={searchContact}
            />
            <button type="button"></button>
          </div>

          <div className="contacts-listing">
            <div className="scrollbar" style={{ position: "relative" }}>
              <div className="overflow">
                <ul>
                  {isLoading === true ? (
                    <div className="example">
                      <Spin size="large" />
                    </div>
                  ) : userContactList ? (
                    filterContactList.map((contact, index) => (
                      <>
                        <li
                          key={contact.firstName}
                          className={
                            selectedUser === contact.userId
                              ? "activeContact"
                              : ""
                          }
                          onClick={() => selectedUserHandler(contact)}
                        >
                          <a href="#" className="clearfix">
                            <div
                              className="imgwrap"
                              style={{ position: "relative" }}
                            >
                              <img
                                src={
                                  profileImg.length >= 0 &&
                                  profileImg[index] &&
                                  profileImg[index][0]
                                    ? profileImg[index][0].profileImage
                                    : userimage
                                }
                                alt=""
                              />
                            </div>
                            {recieveMsg === contact.userId &&
                            isNewMessage === true &&
                            isChatOpen === false ? (
                              <img
                                src={alerticon}
                                style={{
                                  position: "absolute",
                                  right: 10,
                                }}
                              />
                            ) : null}
                            <div className="contactdetail">
                              <h4>
                                {contact.firstName} &nbsp; {contact.lastName}
                              </h4>

                              {senderPath === contact.userId ? (
                                <img
                                  src={alerticon}
                                  style={{
                                    position: "absolute",
                                    right: 10,
                                  }}
                                />
                              ) : null}
                              {/*}
                             
                              {*/}
                              {/*} <span style={{color: '#009999'}}>{contact.timeZone}</span> {*/}
                              {/* <span>9:00 PM</span> */}
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
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
                        src={userimage}
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
                    <h5>
                      {selectedUserInfo.firstName}&nbsp;{" "}
                      {selectedUserInfo.lastName}
                    </h5>
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
                      {chatLoading === true ? (
                        <div className="example">
                          <Spin size="large" />
                        </div>
                      ) : null}
                      {studentChatData.length > 0 ? (
                        studentChatData.map((chat, i) => (
                          <div key={i}>
                            {chat.receiverId === isCurrentUser.loginId ? (
                              <div key={i + "student"} className="incomingmsgs">
                                <ul>
                                  <li className="clearfix">
                                    <div className="msg-detail">
                                      <div className="msg-wrap">
                                        <p> {chat.message} </p>
                                      </div>
                                      {moment(chat.createdAt).format("lll")}
                                    </div>
                                    {/* <div className="msg-img">
                                      <img src={userimage} alt="" />
                                    </div> */}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              <div key={i + "tutor"} className="outgoingmsgs">
                                <ul>
                                  <li>
                                    {/* <div className="msg-img">
                                      <img src={Image} alt="" />
                                    </div> */}
                                    <div className="msg-detail">
                                      <div className="msg-wrap">
                                        <p>{chat.message}</p>
                                      </div>
                                      {moment(chat.createdAt).format("lll")}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
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
  ) : null;
};

export default Chat;
