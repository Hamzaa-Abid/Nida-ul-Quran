import React from "react";
import "./reviews.css";

import user1 from "../../../assets/images/sayabout-user1.jpg";
import user2 from "../../../assets/images/sayabout-user2.jpg";
import user3 from "../../../assets/images/sayabout-user3.jpg";

import OwlCarousel from "react-owl-carousel";
import "../../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "../../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css";

const Reviews = () => {
  return (
    <>
      <section id="sayabout-section">
        <div className="container">
          <h2>What they say about us</h2>
          <OwlCarousel className="owl-carousel owl-theme" loop margin={10} nav>
            <div className="item">
              <div className="sayabout-box">
                <div className="testi-img">
                  <img src={user1} alt="icon" />
                  <div className="img-overlay"></div>
                </div>
                <h3>Zohaib Ahmad</h3>
                <span>STUDENT</span>
                <p>
                  Really loving the quick support that you are providing on
                  Qutor. May Allah (SWT) reward you and your team with lots of
                  khair and barakah.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="sayabout-box">
                <div className="testi-img">
                  <img src={user3} alt="" />
                  <div className="img-overlay"></div>
                </div>
                <h3>A. Islam</h3>
                <span>STUDENT</span>
                <p>
                  I would like to thank you for your site which I am now using
                  to support myself and my son with our Quran. I have now been
                  on it for a month and we are enjoying it.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="sayabout-box">
                <div className="testi-img">
                  <img src={user1} alt="" />
                  <div className="img-overlay"></div>
                </div>
                <h3>Sajida Rizwan</h3>
                <span>STUDENT</span>
                <p>
                  My overall experience with Qutor has been very good
                  Alhamdullilah and I will definitely be recommending the
                  website to anyone interested. JazakhAllah khair
                </p>
              </div>
            </div>
            <div className="item">
              <div className="sayabout-box">
                <div className="testi-img">
                  <img src={user2} alt="" />
                  <div className="img-overlay"></div>
                </div>
                <h3>Zohaib Ahmad</h3>
                <span>STUDENT</span>
                <p>
                  Really loving the quick support that you are providing on
                  Qutor. May Allah (SWT) reward you and your team with lots of
                  khair and barakah.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="sayabout-box">
                <div className="testi-img">
                  <img src={user1} alt="" />
                  <div className="img-overlay"></div>
                </div>
                <h3>A. Islam</h3>
                <span>STUDENT</span>
                <p>
                  I would like to thank you for your site which I am now using
                  to support myself and my son with our Quran. I have now been
                  on it for a month and we are enjoying it.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="sayabout-box">
                <div className="testi-img">
                  <img src={user3} alt="" />
                  <div className="img-overlay"></div>
                </div>
                <h3>Sajida Rizwan</h3>
                <span>STUDENT</span>
                <p>
                  My overall experience with Qutor has been very good
                  Alhamdullilah and I will definitely be recommending the
                  website to anyone interested. JazakhAllah khair
                </p>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </section>
    </>
  );
};

export default Reviews;
