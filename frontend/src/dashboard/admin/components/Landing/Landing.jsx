import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "../../../../axios";
import getUserInfo from "../../../../shared/Helpers/getUserInfo";
import { Tabs, Empty, message, Modal, Spin } from "antd";
import msgIcon from "../../../../assets/images/messagewhite-icon.png";
import CallIcon from "../../../../assets/images/videocall-icon.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import callerTune from "../../../../assets/audio/calling.mp3";
import { VideoCameraOutlined, LoadingOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

const Landing = () => {
  const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { confirm } = Modal;
  let SocketData = useSelector((state) => state.socketReducer.data);
  const CALL_URL = "https://alkitab-jitsi.centralus.cloudapp.azure.com/";
  const history = useHistory();
  let audio = new Audio(callerTune);
  const photo =
    "https://emeraldpsychiatry.com/wp-content/uploads/2018/05/dummy_players.png";

  const [isAllTutors, setAllTutors] = useState([]);
  const [isAllInvited, setAllInvited] = useState([]);
  const [isUserInfo, setUserInfo] = useState({});
  const [isInvitedId, setInvitedId] = useState(null);
  const [isPendingInvitations, setPendingInvitations] = useState([]);
  const [isAllRecommendations, setAllRecommendations] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Here')
  }, [])

  const getAllTutors = async (user) => {
    try {
      const tutors = await axios.get(
        `/contact/allcontacts?loginId=${user.loginId}&role=${user.userRole}`
      );
      console.log("All students", tutors.data.data);
      const allTutorsData = tutors.data.data;
      setAllTutors(allTutorsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getInvitedUsers = async (user) => {
    try {
      const users = await axios.get(
        `contact/invitations?loginId=${user.loginId}&role=${user.userRole}`
      );
      console.log("All invited students", users.data.data);
      const allInvited = users.data.data;
      setAllInvited(allInvited);
    } catch (error) {
      console.log(error);
    }
  };

  const recommendedUsers = async (user) => {
    try {
      const recommendation = await axios.get(
        `contact/recommendation/?loginId=${user.loginId}&role=${user.userRole}`
      );
      console.log("All recommendation", recommendation.data.data);
      const allRecommendations = recommendation.data.data;
      setAllRecommendations(allRecommendations);
    } catch (error) {
      console.log(error);
    }
  };

  const listenCall = async () => {
    try {
      SocketData.on("initiateCall", (data) => {
        let repeate = setInterval(() => {
          audio.play();
        }, 3000);
        confirm({
          title: "Do you want to receive call?",
          icon: <VideoCameraOutlined />,
          content: "Click OK to receive call",
          onOk() {
            audio.pause();
            clearInterval(repeate);
            window.open(`${data.callUrl}`, "_blank");
          },
          onCancel() {
            clearInterval(repeate);
            audio.pause();
          },
        });
      });
    } catch (error) {
      console.log("ERROR, while dialing...", error.message);
    }
  };

  const sendInvite = async (invitedTo) => {
    setLoading(true);
    try {
      let data = {
        invitedTo,
        invitedBy: isUserInfo.loginId,
        role: isUserInfo.userRole,
      };
      console.log("invitedTo", data);
      const invitation = await axios.post("contact", data);
      invitation && setLoading(false);
      console.log("Success", invitation);
      setInvitedId(invitedTo);
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation sent`,
          style: {
            zIndex: "999999",
            fontSize: "20px",
          },
        });
        getAllTutors(isUserInfo);
        getPendingInvitations(isUserInfo);
        recommendedUsers(isUserInfo);
        getInvitedUsers(isUserInfo);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getPendingInvitations = async (isUserInfo) => {
    try {
      const pendingInvitations = await axios.get(
        `contact/pendinginvites/?loginId=${isUserInfo.loginId}&role=${isUserInfo.userRole}`
      );
      console.log("pendingInvitations Success", pendingInvitations.data.data);
      pendingInvitations && setPendingInvitations(pendingInvitations.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptInvitationHandler = async (value) => {
    const { invitedBy, invitedTo, role, isAccepted } = value;
    try {
      const acceptInvitation = await axios.put("contact", {
        invitedBy: invitedBy,
        invitedTo: invitedTo,
        role: role,
        isAccepted,
      });
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation Accepted!`,
          style: {
            zIndex: "999999",
            fontSize: "20x",
          },
        });
      });
      getAllTutors(isUserInfo);
      getPendingInvitations(isUserInfo);
      recommendedUsers(isUserInfo);
      getInvitedUsers(isUserInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectInvitationHandler = async (value) => {
    console.log("VALUE", value);
    const { invitedBy, invitedTo, role, isAccepted } = value;
    try {
      const rejectInvitation = await axios.put("contact", {
        invitedBy: invitedBy,
        invitedTo: invitedTo,
        role: role,
        isAccepted,
      });
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation Rejected!`,
          style: {
            zIndex: "999999",
            fontSize: "20px",
          },
        });
      });
      getAllTutors(isUserInfo);
      getPendingInvitations(isUserInfo);
      recommendedUsers(isUserInfo);
      getInvitedUsers(isUserInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const sentMessage = async (id) => {
    try {
      const contact = await axios.post("chatcontact", {
        studentId: `${isUserInfo.loginId}`,
        teacherId: `${id}`,
        role: "student",
      });
      contact.status && history.push("/student/chat");
    } catch (error) {
      console.log("Already exist!");
    }
    console.log("!!!", id);
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
      getPendingInvitations(res);
      recommendedUsers(res);
      getAllTutors(res);
      getInvitedUsers(res);
    });
    listenCall();
  }, [SocketData]);

  return (
    <div className="tab-wrapper">
      <Tabs defaultActiveKey="1" type="card" size={"large"}>
        <TabPane tab="" key="1">
          <div id="current-tutor-wrap">
            <div className="current-tutor-left">
              {isAllTutors ? (
                isAllTutors.map(
                  (student) =>
                    student.firstName && (
                      <>
                        <div className="reusedbox-content clearfix box-padding">
                          <div className="image-wrap">
                            <img src={photo} alt="" />
                          </div>
                          <div className="boxcontent ">
                            <h4>
                              {student.firstName} {student.lastName}
                            </h4>
                            {/* <span>Next session in:</span>
                                                    <em>10h:03m</em><br /> */}
                            <span>Subject:</span>
                            {student.subjects.map((subject) => (
                              <em
                                key={subject}
                                style={{ textTransform: "capitalize" }}
                              >
                                {" "}
                                {subject}, &nbsp;{" "}
                              </em>
                            ))}
                            <br />
                            <span>Gender:</span>
                            {student.gender.map((gend) => (
                              <em
                                key={gend}
                                style={{ textTransform: "capitalize" }}
                              >
                                {" "}
                                {gend}, &nbsp;{" "}
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
                                  <img src={msgIcon} alt="icon" />{" "}
                                </a>
                              </li>
                              {/* <li>
                              <a className="greenbox" onClick={null}>
                                <img src={CallIcon} alt="icon" />
                              </a>
                            </li> */}
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
              <Tabs type="card">
                <TabPane tab="Recommended" key="1">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isAllRecommendations.map(
                        (tutor) =>
                          tutor.firstName && (
                            <>
                              <div class="right-content">
                                <div class="currenttutuors-tab">
                                  <div class="reusedbox-content clearfix">
                                    <div class="image-wrap">
                                      <img src={photo} alt="photo" />
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
                                          }}
                                        >
                                          {" "}
                                          {subject}, &nbsp;{" "}
                                        </em>
                                      ))}
                                      <br />
                                      <span>Spoken Languages: </span>
                                      {tutor.languages.map((language) => (
                                        <em key={language}>
                                          {" "}
                                          {language}, &nbsp;{" "}
                                        </em>
                                      ))}
                                      <br />
                                      <span>Country: </span>
                                      <em> {tutor.country}</em>
                                      <br />
                                    </div>
                                    <div
                                      style={{
                                        textAlign: "right",
                                        marginTop: "90px",
                                      }}
                                    >
                                      {isUserInfo &&
                                        isUserInfo.userRole !== "tutor" && (
                                          <a
                                            disabled={isLoading}
                                            className="green-btn"
                                            onClick={() =>
                                              sendInvite(tutor.userId)
                                            }
                                          >
                                            {isLoading
                                              ? `sending Invitation`
                                              : `send Invitation`}
                                          </a>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                      )}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Invited" key="2">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isAllInvited &&
                        isAllInvited.map(
                          (tutor) =>
                            tutor.firstName && (
                              <>
                                <div class="right-content">
                                  <div class="currenttutuors-tab">
                                    <div class="reusedbox-content clearfix">
                                      <div class="image-wrap">
                                        <img src={photo} alt="photo" />
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
                                            }}
                                          >
                                            {" "}
                                            {subject}, &nbsp;{" "}
                                          </em>
                                        ))}
                                        <br />
                                        <span>Spoken Languages: </span>
                                        {tutor.languages.map((language) => (
                                          <em key={language}>
                                            {" "}
                                            {language}, &nbsp;{" "}
                                          </em>
                                        ))}
                                        <br />
                                        <span>Country: </span>
                                        <em> {tutor.country}</em>
                                        <br />
                                      </div>
                                      {/* <div style={{ textAlign: 'right'}}>
                                                                        {
                                                                                <a className="green-btn-disabled" disabled>Invitation sent</a>
                                                                        }
                                                                    </div> */}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                        )}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Pending Invitations" key="3">
                  <div class="overview-content" id="sessions">
                    <div class="overviewtab-row clearfix">
                      {isPendingInvitations &&
                        isPendingInvitations.map((tutor, index) => (
                          <>
                            <div class="right-content">
                              <div class="currenttutuors-tab">
                                <div class="reusedbox-content clearfix">
                                  <div class="image-wrap">
                                    <img src={photo} alt="photo" />
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
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {" "}
                                        {subject}, &nbsp;{" "}
                                      </em>
                                    ))}
                                    <br />
                                    <span>Spoken Languages: </span>
                                    {tutor.languages.map((language) => (
                                      <em key={language}>
                                        {" "}
                                        {language}, &nbsp;{" "}
                                      </em>
                                    ))}
                                    <br />
                                    <span>Country: </span>
                                    <em> {tutor.country}</em>
                                    <br />
                                  </div>
                                  <div style={{ textAlign: "right" }}>
                                    <a
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
                                    </a>
                                    &nbsp;&nbsp;
                                    <a
                                      className="reject-btn"
                                      onClick={() =>
                                        rejectInvitationHandler({
                                          invitedBy: tutor.userId,
                                          invitedTo: isUserInfo.loginId,
                                          role: isUserInfo.userRole,
                                          isAccepted: false,
                                        })
                                      }
                                    >
                                      Reject
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
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
