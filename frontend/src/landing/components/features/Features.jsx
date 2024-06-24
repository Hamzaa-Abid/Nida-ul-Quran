import React from "react";
import "./features.css";

import featureIcon1 from '../../../assets/images/feature-icon1.png';
import featureIcon2 from '../../../assets/images/feature-icon2.png';
import featureIcon3 from '../../../assets/images/feature-icon3.png';
import featureIcon4 from '../../../assets/images/feature-icon4.png';
import prayingMan from '../../../assets/images/prayingman.png';

const Features = () => {
  return (
    <>
      <section id="features-section">
        <div className="container">
          <h2>OUR FEATURES</h2>
          <div className="features-content clearfix">
            <div className="featurescontent-left">
              <div className="content-detail clearfix">
                <div className="content">
                  <h4>Interactive Platform</h4>
                  <p>
                    We make your learning efficient by your ease of access to in-built classrooms where you can take lessons from our highly experienced and certified tutors.
                </p>
                </div>
                <div className="feature-img">
                  <img src={featureIcon1} alt="" />
                </div>
              </div>
              <div className="content-detail clearfix">
                <div className="feature-img">
                  <img src={featureIcon3} alt="" />
                </div>
                <div className="content">
                  <h4>Latest technology</h4>
                  <p>
                    With the latest cloud technology, we make your learning journey smooth, fast and convenient.
                </p>
                </div>
              </div>
              <div className="content-detail clearfix">
                <div className="feature-img">
                  <img src={featureIcon3} alt="" />
                </div>
                <div className="content">
                  <h4>Archiving</h4>
                  <p>
                    Save online lectures and your favorite lessons. Just enable the archiving function and do your revisions.
                </p>
                </div>
              </div>

            </div>
            <div className="featurescontent-middle">
              <div className="prayerman-img">
                <img src={prayingMan} alt="" />
              </div>
            </div>
            <div className="featurescontent-right">
              <div className="content-detail clearfix">
                <div className="feature-img">
                  <img src={featureIcon2} alt="" />
                </div>
                <div className="content">
                  <h4>Enhanced Learning</h4>
                  <p>
                    Learn detailed comprehension of Surahs, and chapters of Quran, Memorization as well as Arabic, Religious Studies, Tajweed etc for improved learning.
                </p>
                </div>
              </div>
              <div className="content-detail clearfix">
                <div className="content">
                  <h4>Easy to use</h4>
                  <p>
                    Our platform is easy to understand and use. It is developed for all age groups and is highly user friendly
                </p>
                </div>
                <div className="feature-img">
                  <img src={featureIcon4} alt="" />
                </div>
              </div>
              <div className="content-detail clearfix">
                <div className="content">
                  <h4>Parental Watch</h4>
                  <p>
                    Have insights of your child’s learning process.
                    Keep yourself updated and track the progress of your child
                    from specialized parental watch feature.
                </p>
                </div>
                <div className="feature-img">
                  <img src={featureIcon4} alt="" />
                </div>
              </div>



            </div>
          </div>
          {/* <div className="featurebottom-box">
        <div className="content-detail">
          <div className="feature-img">
            <img src="images/feature-icon5.png" alt="" />
          </div>
          <div className="content">
            <h4>Check Your System Compatibility</h4>
            <p>Online Quran Learning works best when you can communicate with each other. Make sure your computer is set up properly.</p>
          </div>
        </div>
        <a href="#" className="default-btn">Check Your System Now </a>
      </div> */}
        </div>
      </section>
    </>
  );
};

export default Features;
