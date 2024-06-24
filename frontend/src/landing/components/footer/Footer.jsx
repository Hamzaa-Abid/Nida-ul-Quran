import React from "react";
import './footer.css'

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="footertop-section">
          <div className="container">
            <div className="footer-logo">
              <a href="#"></a>
            </div>
            <br/>
            <br/>
            {/* <p>
              Islam is the most popular lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna.
            </p> */}
            <div className="footer-links clearfix">
              <div className="links-box">
                <h5>Site Links</h5>
                <ul>
                  <li>
                    <a href="/home/about-us">About Us</a>
                  </li>
                  <li>
                    <a href="/home/faqs">FAQs</a>
                  </li>
                  <li>
                    <a href="/home/pricing">Plans & Pricing</a>
                  </li>
                  <li>
                    <a href="/home/contact-us">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="links-box">
                <h5>Find Tutors and Students</h5>
                <ul>
                  <li>
                    <a href="/home/find-student">Find Students</a>
                  </li>
                  <li>
                    <a href="/home/find-tutor">Find Tutor</a>
                  </li>
                  <li>
                    <a href="/home/rules">Rules and Regulations</a>
                  </li>
                  <li>
                    <a href="#">Sign Up Today</a>
                  </li>
                </ul>
              </div>
              <div className="links-box">
                <h5>Learn Islamic Subjects</h5>
                <ul>
                  <li>
                    <a href="/home/about-us">Learn Quran and Tajweed</a>
                  </li>
                  <li>
                    <a href="/home/about-us">Learn Islamic Studies in Your Language</a>
                  </li>
                  <li>
                    <a href="/home/about-us">Perform Hifz in Your Language</a>
                  </li>
                  <li>
                    <a href="/home/about-us">Learn Arabic in Your Language</a>
                  </li>
                </ul>
              </div>
              <div className="links-box">
                <h5>Contact Us</h5>
                <p>12612 Kennedy Road, Caledon, Ontario, Canada</p>
                <p>
                  Phone: <a href="callto: 1-6479279151"> 1-6479279151</a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:contact@nidaulquran.com">contact@nidaulquran.com</a>
                </p>
                <div className="socialmedia">
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerbottom-section">
          <div className="container">
            <div className="footerbottom-content clearfix">
              <div className="content-heading">
                <h3>Subscribe For Latest Updates</h3>
              </div>
              <div className="email-field">
                <input type="email" placeholder="Email address" />
                <button type="submit" className="default-btn">
                  Subscribe
                </button>
              </div>
            </div>
            <p>NIDA UL QURAN COPYRIGHTS © 2020 - All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
