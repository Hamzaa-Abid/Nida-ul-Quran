import React from "react";
import "./register.css";
import profileImage from "../../../assets/images/profile-img.jpg";
// import Collapse from 'react-Collapse';
import { Collapse } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const RegisterTutor = () => {
  const { Panel } = Collapse;
  return (
    <>
      <section id="registertutor">
        <div className="container">
          <h2>REGISTER AS TUTOR</h2>
          <div className="registeraccordian-section clearfix">
            <div className="registercontent-left">
              <div className="registerimg">
                <img src={profileImage} alt="" />
              </div>
              <div id="content-1" className="img-content">
                <h2>
                  “If you have knowledge, illuminate the path of others with it”
                </h2>
              </div>
            </div>
            <div className="registercontent-right">
              <div className="registerright-content register-wrap">
                <Collapse
                  bordered={false}
                  accordion
                  expandIconPosition="right"
                  expandIcon={({ isActive }) => (
                    isActive ? null : <PlusCircleFilled style={{ fontSize: '24px' }} />
                  )}
                >
                  <Panel header={<h4 class={'active'}>1. BUILD YOUR PROFILE</h4>}>
                    <p>
                      Tell us about yourself in simple steps, build your profile
                      and start teaching.
                    </p>
                  </Panel>
                  <Panel header="2. TAKE THE QUIZ">
                    <p>
                      Take the quiz and prove yourself! Be a part of our team of
                      competent Tutors.{" "}
                    </p>
                  </Panel>
                  <Panel header="3.TEACH AND EARN">
                    <p>
                      Start your teaching journey immediately. Make your
                      knowledge a source of wisdom for others by teaching
                      efficiently and earning at the same time.{" "}
                    </p>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
          <a href="#" className="default-btn">
            Sign Up As Tutor
          </a>
        </div>
      </section>
    </>
  );
};

export default RegisterTutor;
