import React from "react";
import './why.css';
import kitabIcon1 from '../../../assets/images/kitab-icon2.png';
import kitabIcon2 from '../../../assets/images/kitab-icon3.png';
import kitabIcon3 from '../../../assets/images/kitab-icon4.png';
import kitabIcon4 from '../../../assets/images/kitab-icon5.png';
import kitabIcon5 from '../../../assets/images/kitab-icon6.png';
import kitabIcon6 from '../../../assets/images/kitab-icon7.png';

import kitabIconWhite1 from '../../../assets/images/kitab-icon2-white.png';
import kitabIconWhite2 from '../../../assets/images/kitab-icon3-white.png';
import kitabIconWhite3 from '../../../assets/images/kitab-icon4-white.png';
import kitabIconWhite4 from '../../../assets/images/kitab-icon5-white.png';
import kitabIconWhite5 from '../../../assets/images/kitab-icon6-white.png';
import kitabIconWhite6 from '../../../assets/images/kitab-icon7-white.png';

const Why = () => {
  return (
    <>
    <section id="why-alkitaab">
      <div className="container">
        <h2>Why Nida Ul Quran</h2>
        <div className="kitaab-box-wrap why-kitaab-row">
          <div className="kitaab-box">
            <div className="kitaab-icon">
              <img src={kitabIcon1} alt="" />
              <img
                className="img-white"
                src={kitabIconWhite1}
                alt=""
              />
            </div>
            <h3>Qualified<br/> Tutors</h3>
            <p>
            Learn and better understand from our verified professional tutors. 
            </p>
            <a href="/home/about-us">Read More</a>
          </div>
          <div className="kitaab-box">
            <div className="kitaab-icon">
              <img src={kitabIcon2} alt="" />
              <img
                className="img-white"
                src={kitabIconWhite2}
                alt=""
              />
            </div>
            <h3>Unlimited <br/> Learning</h3>
            <p>
            We believe education should never be restricted. Learn as much...  
            </p>
            <a href="/home/about-us">Read More</a>
          </div>
          <div className="kitaab-box mr-0">
            <div className="kitaab-icon">
              <img src={kitabIcon3} alt="" />
              <img
                className="img-white"
                src={kitabIconWhite3}
                alt=""
              />
            </div>
            <h3>No-age <br/> Restrictions</h3>
            <p>
            It is never too early or too late for learning. Learning is a lifetime process.
              </p>
            <a href="/home/about-us">Read More</a>
          </div>
        </div>
        <div className="kitaab-box-wrap why-kitaab-row">
          <div className="kitaab-box">
            <div className="kitaab-icon">
              <img src={kitabIcon4} alt="" />
              <img
                className="img-white"
                src={kitabIconWhite4}
                alt=""
              />
            </div>
            <h3>Safe <br/> Learning</h3>
            <p>Learn in a safe environment, interact with tutors without worrying about anything. 
             </p>
            <a href="/home/about-us">Read More</a>
          </div>
          <div className="kitaab-box">
            <div className="kitaab-icon">
              <img src={kitabIcon5} alt="" />
              <img
                className="img-white"
                src={kitabIconWhite5}
                alt=""
              />
            </div>
            <h3>Female & Male <br/> Tutors</h3>
            <p>We have male and female tutors available. You can hire female tutors for your children. 
            </p>
            <a href="/home/about-us">Read More</a>
          </div>
          <div className="kitaab-box mr-0">
            <div className="kitaab-icon">
              <img src={kitabIcon6} alt="" />
              <img
                className="img-white"
                src={kitabIconWhite6}
                alt=""
              />
            </div>
            <h3>Multilingual <br/> Platform</h3>
            <p>
            Learn in various languages! Our diversified tutors have the ability to teach...
            </p>
            <a href="/home/about-us">Read More</a>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Why;
