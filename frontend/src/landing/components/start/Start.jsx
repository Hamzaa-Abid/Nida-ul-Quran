import React from "react";
import './start.css';
import logo from '../../../assets/images/learntech-logo.png';

const Start = () => {
  return (
    <>
      <section id="learnteach-banner">
        <div className="container">
          <div className="learnteach-content clearfix">
            <div className="learnteach-left">
              <h2>Do You Want To Learn Quran, Tafseer or Hadith?</h2>
              <a href="#" className="border-btn">
                Sign Up As Student
              </a>
            </div>
            <div className="learnteach-middle">
              <div className="learnteach-logo">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="learnteach-right">
              <h2>Are You A Qualified Scholar And Want To Teach Quran?</h2>
              <a href="#" className="border-btn">
                Sign Up As Tutor
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Start;
