import React, { useEffect, useState } from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import axios from "../../../../axios";
import getUserInfo from "../../../../shared/Helpers/getUserInfo";
import msgIcon from "../../../../assets/images/messagewhite-icon.png";
import CallIcon from "../../../../assets/images/videocall-icon.png";
import { Tabs, Empty, message, notification, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
const { TabPane } = Tabs;

const Landing = () => {
  let SocketData = useSelector((state) => state.socketReducer.data);
  const CALL_URL = "https://alkitab-jitsi.centralus.cloudapp.azure.com/";
  const history = useHistory();

  const photo =
    "https://emeraldpsychiatry.com/wp-content/uploads/2018/05/dummy_players.png";
  const [isAllStudents, setAllStudents] = useState([]);
  const [isAllInvited, setAllInvited] = useState([]);
  const [isAllRecommendations, setAllRecommendations] = useState([]);
  const [isUserInfo, setUserInfo] = useState({});
  const [isInvitedId, setInvitedId] = useState(null);
  const [isPendingInvitations, setPendingInvitations] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [tabState, setTabState] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState([]);
  const [rImg, setRImg] = useState([]);
  const [siImg, setSiImg] = useState([]);
  const [riImg, setRiImg] = useState([]);
  let { path } = useRouteMatch();
  let location = useLocation();
  useEffect(() => {
    setSelectedTab(location.tab);
    setTabState(true);
  }, [location]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Appointments are approved",
      description: "The appointments have been approved.",
    });
  };

  useEffect(() => {
    console.log("This is OBDEV");
    const params = new URLSearchParams(window.location.search);
    if (params.has("contactID")) {
      let body = {
        contactID: params.get("contactID"),
      };
      axios
        .post("http://localhost:5500/approve-appointments", body, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          openNotificationWithIcon("success");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const getAllStudents = async (user) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    setLoading(true);
    console.log("Get all students hit");
    try {
      const students = await axios.get(
        `/contact/allcontacts?loginId=${user.loginId}&role=${user.userRole}`,
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      console.log("All students", students.data.data);
      const allTutorsData = students.data.data;

      setAllStudents(allTutorsData);
      const userImgs = allTutorsData.map((item, index) => item.profileImage);
      setProfileImg(userImgs);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        toast.notify(
          "Request Timed out. Please Check your Network Connectivity."
        );
      }
      setLoading(false);
    }
  };

  const recommendedUsers = async (user) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    console.log("Recommended hit");
    setLoading(true);
    try {
      const recommendation = await axios.get(
        `contact/recommendation/?loginId=${user.loginId}&role=${user.userRole}`,
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      console.log("All recommendation", recommendation.data.data);
      const allRecommendations = recommendation.data.data;

      setAllRecommendations(allRecommendations);
      const userImgs = allRecommendations.map(
        (item, index) => item.profileImage
      );
      setRImg(userImgs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const setUserName = async () => {
    const userInfo = await localStorage.getItem("userInfo");
    const name = JSON.parse(userInfo);
    console.log("User Info", name);
    setUser(name.username);
  };

  const sendInvite = async (invitedTo) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    console.log("Send Invite hit", invitedTo);
    try {
      let data = {
        invitedTo: invitedTo,
        invitedBy: isUserInfo.loginId,
        role: isUserInfo.userRole,
        username: user,
      };
      console.log("invitedTo", data);
      const invitation = await axios.post("contact", data, {
        headers: {
          authorization: myToken,
        },
      });
      console.log("Success", invitation);
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation sent`,
          style: {
            zIndex: "999999",
            fontSize: "20px",
          },
        });
        setInvitedId(invitedTo);
        getPendingInvitations(isUserInfo);
        getAllStudents(isUserInfo);
        recommendedUsers(isUserInfo);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingInvitations = async (isUserInfo) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    console.log("get pending invitation hit");
    try {
      const pendingInvitations = await axios.get(
        `contact/pendinginvites/?loginId=${isUserInfo.loginId}&role=${isUserInfo.userRole}`,
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      console.log("Recieved Invitations", pendingInvitations.data.data);
      pendingInvitations && setPendingInvitations(pendingInvitations.data.data);
      const allPendingInvites = pendingInvitations.data.data;
      const userImgs = allPendingInvites.map(
        (item, index) => item.profileImage
      );
      setRiImg(userImgs);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptInvitationHandler = async (value) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    console.log("accept invitation hit");
    const { invitedBy, invitedTo, role, isAccepted } = value;
    try {
      const acceptInvitation = await axios.put(
        "contact",
        {
          invitedBy: invitedBy,
          invitedTo: invitedTo,
          role: role,
          isAccepted,
          username: user,
        },
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation Accepted!`,
          style: {
            zIndex: "999999",
            fontSize: "20px",
          },
        });
        getPendingInvitations(isUserInfo);
        getAllStudents(isUserInfo);
        recommendedUsers(isUserInfo);
        recommendedUsers(isUserInfo);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectInivitationHandler = async (value) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    console.log("Reject invitation hit");
    console.log("VALUE", value);
    const { invitedBy, invitedTo, role, isAccepted } = value;
    try {
      const acceptInvitation = await axios.put(
        "contact",
        {
          invitedBy: invitedBy,
          invitedTo: invitedTo,
          role: role,
          isAccepted,
          username: user,
        },
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation Rejected!`,
          style: {
            zIndex: "999999",
            fontSize: "20px",
          },
        });
      });
      getPendingInvitations(isUserInfo);
      getAllStudents(isUserInfo);
      recommendedUsers(isUserInfo);
      recommendedUsers(isUserInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const sentMessage = async (id) => {
    try {
      const contact = await axios.post("chatcontact", {
        studentId: `${isUserInfo.loginId}`,
        teacherId: `${id}`,
        role: `${isUserInfo.userRole}`,
      });
      contact.status && history.push(`/${isUserInfo.userRole}/chat`);
    } catch (error) {
      console.log("Already exist!");
    }
    console.log("!!!", id);
  };

  const setupCall = async (id) => {
    alert("dialing........");
    try {
      let call = await axios.post("call", {
        teacherId: isUserInfo.loginId,
        studentId: id,
        isCallInitiate: true,
      });
      const callInfo = call.data.data;
      SocketData.emit("call", {
        ...callInfo,
        callUrl: `${CALL_URL}${id}${isUserInfo.loginId}`,
        role: `${isUserInfo.userRole}`,
      });
      window.open(`${CALL_URL}${id}${isUserInfo.loginId}`, "_blank");
    } catch (error) {
      console.log("ERROR, while dialing...", error.message);
    }
  };

  const getInvitedUsers = async (user) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    console.log("Get Invited users hit");
    setLoading(true);
    try {
      const users = await axios.get(
        `contact/invitations?loginId=${user.loginId}&role=${user.userRole}`,
        {
          headers: {
            authorization: myToken,
          },
        }
      );
      console.log("All invited students", users.data.data);
      const allInvited = users.data.data;
      setAllInvited(allInvited);
      const userImgs = allInvited.map((item, index) => item.profileImage);
      setSiImg(userImgs);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      getAllStudents(res);
      setUserInfo(res);
      getPendingInvitations(res);
      recommendedUsers(res);
      setUserName();
      getInvitedUsers(res);
    });
  }, []);

  return (
    <div className="tab-wrapper">
      <Tabs defaultActiveKey="1" type="card" size={"large"}>
        <TabPane tab="Connected Students" key="1">
          <div id="current-tutor-wrap">
            <div className="current-tutor-left">
              {isLoading === true ? (
                <div className="example">
                  <Spin size="large" />
                </div>
              ) : isAllStudents ? (
                isAllStudents.map(
                  (student, index) =>
                    student.firstName && (
                      <>
                        <div className="reusedbox-content clearfix box-padding">
                          <div className="image-wrap">
                            <img
                              src={
                                profileImg.length >= 0 &&
                                profileImg[index] &&
                                profileImg[index][0]
                                  ? profileImg[index][0].profileImage
                                  : photo
                              }
                              alt=""
                            />
                          </div>
                          <div className="boxcontent ">
                            <h4>
                              {student.firstName} {student.lastName}
                            </h4>
                            {/* <span>Next session in:</span>
                              <em>10h:03m</em><br /> */}
                            <span>Subject: &nbsp;</span>
                            {student.subjects.map((subject) => (
                              <em
                                key={subject}
                                style={{
                                  textTransform: "capitalize",
                                  marginBottom: "6px",
                                }}
                              >
                                {subject}, &nbsp;
                              </em>
                            ))}
                            <br />
                            <a className="btn-cancel">Cancel</a>
                            <a className="btn-cancelborder">
                              End this Contract
                            </a>
                          </div>
                          <div className="box-otherlinks">
                            <ul>
                              <li>
                                <a
                                  className="bluebox"
                                  onClick={() => sentMessage(student.userId)}
                                >
                                  <img src={msgIcon} alt="icon" />
                                </a>
                              </li>
                              <li>
                                <a
                                  className="greenbox"
                                  onClick={() => setupCall(student.userId)}
                                >
                                  <img src={CallIcon} alt="icon" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )
                )
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
            <div className="current-tutor-right">
              <Tabs
                onChange={() => setTabState(false)}
                type="card"
                {...(selectedTab === "tab2" && tabState === true
                  ? { activeKey: "3" }
                  : null)}
                {...(selectedTab === "tab1" && tabState === true
                  ? { activeKey: "1" }
                  : null)}
              >
                <TabPane tab="Recommended" key="1">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isLoading === true ? (
                        <div className="example">
                          <Spin />
                        </div>
                      ) : isAllRecommendations ? (
                        isAllRecommendations.map(
                          (student, index) =>
                            student.firstName && (
                              <>
                                <div class="right-content">
                                  <div class="currenttutuors-tab">
                                    <div class="reusedbox-content clearfix">
                                      <div class="image-wrap">
                                        <img
                                          src={
                                            rImg.length >= 0 &&
                                            rImg[index] &&
                                            rImg[index][0]
                                              ? rImg[index][0].profileImage
                                              : photo
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div
                                        class="boxcontent"
                                        style={{ width: "auto" }}
                                      >
                                        <h4>
                                          {student.firstName} {student.lastName}
                                        </h4>
                                        <span>Interest: </span>
                                        {student.subjects.map((subject) => (
                                          <em
                                            key={subject}
                                            style={{
                                              textTransform: "capitalize",
                                              marginBottom: "8px",
                                            }}
                                          >
                                            {subject}, &nbsp;
                                          </em>
                                        ))}
                                        <br />
                                        <span>Spoken Languages: </span>
                                        {student.languages.map((language) => (
                                          <em
                                            key={language}
                                            style={{ marginBottom: "8px" }}
                                          >
                                            {" "}
                                            {language}, &nbsp;{" "}
                                          </em>
                                        ))}
                                        <br />
                                        <span>Country: </span>
                                        <em style={{ marginBottom: "8px" }}>
                                          {" "}
                                          {student.country || null}
                                        </em>
                                        <br />
                                      </div>
                                      <div
                                        style={{
                                          textAlign: "right",
                                          marginTop: "90px",
                                        }}
                                      >
                                        {isUserInfo &&
                                          isUserInfo.userRole !== "student" && (
                                            <a
                                              className="green-btn"
                                              onClick={() =>
                                                sendInvite(student.userId)
                                              }
                                            >
                                              Send Invitation
                                            </a>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                        )
                      ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      )}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Sent Invitations" key="2">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isLoading === true ? (
                        <div className="example">
                          <Spin />
                        </div>
                      ) : isAllInvited ? (
                        isAllInvited.map(
                          (student, index) =>
                            student.firstName && (
                              <>
                                <div class="right-content">
                                  <div class="currenttutuors-tab">
                                    <div class="reusedbox-content clearfix">
                                      <div class="image-wrap">
                                        <img
                                          src={
                                            siImg.length >= 0 &&
                                            siImg[index] &&
                                            siImg[index][0]
                                              ? siImg[index][0].profileImage
                                              : photo
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div
                                        class="boxcontent"
                                        style={{ width: "auto" }}
                                      >
                                        <h4>
                                          {student.firstName} {student.lastName}
                                        </h4>
                                        <span>Interest: </span>
                                        {student.subjects.map((subject) => (
                                          <em
                                            key={subject}
                                            style={{
                                              textTransform: "capitalize",
                                              marginBottom: "8px",
                                            }}
                                          >
                                            {" "}
                                            {subject}, &nbsp;{" "}
                                          </em>
                                        ))}
                                        <br />
                                        <span>Spoken Languages: </span>
                                        {student.languages.map((language) => (
                                          <em
                                            key={language}
                                            style={{ marginBottom: "8px" }}
                                          >
                                            {" "}
                                            {language}, &nbsp;{" "}
                                          </em>
                                        ))}
                                        <br />
                                        <span>Country:</span>
                                        <em style={{ marginBottom: "8px" }}>
                                          {student.country}
                                        </em>
                                        <br />
                                      </div>
                                      {/* <div style={{ textAlign: 'right', marginTop: '90px' }}>
                                            <a href="#" class="green-btn">Send Invite</a>
                                          </div> */}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                        )
                      ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      )}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Recieved Invitations" key="3">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isPendingInvitations ? (
                        isPendingInvitations.map((tutor, index) => (
                          <>
                            <div class="right-content">
                              <div class="currenttutuors-tab">
                                <div class="reusedbox-content clearfix">
                                  <div class="image-wrap">
                                    <img
                                      src={
                                        riImg.length >= 0 &&
                                        riImg[index] &&
                                        riImg[index][0]
                                          ? riImg[index][0].profileImage
                                          : photo
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    class="boxcontent"
                                    style={{ width: "auto" }}
                                  >
                                    <h4>
                                      {tutor.firstName} {tutor.lastName}
                                    </h4>
                                    <span>Interest: </span>
                                    {tutor.subjects.map((subject) => (
                                      <em
                                        key={subject}
                                        style={{
                                          textTransform: "capitalize",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        {" "}
                                        {subject}, &nbsp;{" "}
                                      </em>
                                    ))}
                                    <br />
                                    <span>Spoken Languages: </span>
                                    {tutor.languages.map((language) => (
                                      <em
                                        key={language}
                                        style={{ marginBottom: "8px" }}
                                      >
                                        {" "}
                                        {language}, &nbsp;{" "}
                                      </em>
                                    ))}
                                    <br />
                                    <span>Country: </span>
                                    <em style={{ marginBottom: "8px" }}>
                                      {" "}
                                      {tutor.country}
                                    </em>
                                    <br />
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "right",
                                      display: "inline-block",
                                    }}
                                  >
                                    <span
                                      className="accept-btn"
                                      onClick={() =>
                                        acceptInvitationHandler({
                                          invitedBy: tutor.userId,
                                          invitedTo: isUserInfo.loginId,
                                          role: isUserInfo.userRole,
                                          isAccepted: true,
                                        })
                                      }
                                    >
                                      Accept
                                    </span>
                                    &nbsp;&nbsp;
                                    <span
                                      className="reject-btn"
                                      onClick={() =>
                                        rejectInivitationHandler({
                                          invitedBy: tutor.userId,
                                          invitedTo: isUserInfo.loginId,
                                          role: isUserInfo.userRole,
                                          isAccepted: false,
                                        })
                                      }
                                    >
                                      Reject
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      )}
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Landing;
