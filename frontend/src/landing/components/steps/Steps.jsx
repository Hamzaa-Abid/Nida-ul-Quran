import React, { useState } from "react";
import "./steps.css";

import stepIcon1 from "../../../assets/images/threestepicon1.png";
import stepActiveIcon1 from "../../../assets/images/threestepiconactive1.png";
import stepIcon2 from "../../../assets/images/threestepicon2.png";
import stepActiveIcon2 from "../../../assets/images/threestepiconactive2.png";
import stepIcon3 from "../../../assets/images/threestepicon3.png";
import stepActiveIcon3 from "../../../assets/images/threestepiconactive3.png";

import slideIcon1 from '../../../assets/images/threestepiconactiveslide1.png';
import slideIcon2 from '../../../assets/images/threestepiconactiveslide2.png';
import slideIcon3 from '../../../assets/images/threestepiconactiveslide3.png';


const Steps = () => {
  const [isSlide, setSlide] = useState('plans');

  const slideHandler = (slide) => {
    setSlide(slide);
  }

  return (
    <>
      <section id="simplestep">
        <div className="container">
          <div className="simplestep-content clearfix">
            <div className="simplestep">
              <div className="simplestep-heading">
                <h6>Start In The Name Of Allah</h6>
                <h2>3 Simple Steps To Start</h2>
              </div>
              <div className="steptabs-section steps-wrap">
                <ul>
                  <li>
                    <a onClick={() => slideHandler('plans')}>
                      <div className="stepimg">
                        <img src={stepIcon1} alt="" />
                        <img className="hoverimg" src={stepActiveIcon1} alt="" />
                      </div>
                      <h6>1</h6>
                      <h5>
                        Select your Plan
                    </h5>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => slideHandler('tutor')}>
                      <div className="stepimg">
                        <img src={stepIcon2} alt="" />
                        <img className="hoverimg" src={stepActiveIcon2} alt="" />
                      </div>
                      <h6>2</h6>
                      <h5 >
                        Select your Tutor
                    </h5>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => slideHandler('journey')}>
                      <div className="stepimg">
                        <img src={stepIcon3} alt="" />
                        <img className="hoverimg" src={stepActiveIcon3} alt="" />
                      </div>
                      <h6>3</h6>
                      <h5 >
                        Start your Journey!
                    </h5>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="hadees-section">
                <h3>"Keep Your Tongue Wet With The Remembrance Of Allah"</h3>
                <p>( Al-Tirmidhi )</p>
              </div>
            </div>
            <div className="simplestep-right">
              {

                isSlide === 'plans' &&
                <div className="item">
                  <div className="simplestep-slide">
                    <div className="slide-img">
                      <img src={slideIcon1} alt="" />
                    </div>
                    <h3>Select your Plan</h3>
                    <p>
                      Select the plan that fits your needs and help you achieve your learning goals. Identify how many hours per month you need in the classroom and then move to the next step.
                  </p>
                    <a href="/home/pricing" className="default-btn">
                      Select Plan
                  </a>
                  </div>
                </div>
              }
              {
                isSlide === 'tutor' &&
                <div className="item">
                  <div className="simplestep-slide">
                    <div className="slide-img">
                      <img src={slideIcon2} alt="" />
                    </div>
                    <h3>Select your Tutor</h3>
                    <p>
                      Selecting your tutor is the second step of your spiritual journey. Among all the highly authorized tutors, you can choose the tutor of your own choice and your budget, which will help you achieve your desired milestones.
                  </p>
                    <a href="/home/find-tutor" className="default-btn">
                      Find Tutor
                  </a>
                  </div>
                </div>
              }
              {
                isSlide === 'journey' &&
                <div className="item">
                  <div className="simplestep-slide">
                    <div className="slide-img">
                      <img src={slideIcon3} alt="" />
                    </div>
                    <h3>Start your Journey!</h3>
                    <p>
                      The final and the most important part of your process is starting your learning by joining the Classroom. Schedule your classes according to your time, and learn comfortably from the comfort of your home.
                  </p>
                    <a href="/home/about-us" className="default-btn">
                      Start Learning Quran
                  </a>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Steps;
