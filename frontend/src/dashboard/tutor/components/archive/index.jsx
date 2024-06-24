import React from 'react'
import './style.css'

import videoImage from '../../../../assets/images/videoimg.png';
import video from '../../../../assets/images/bigvideo-img.png';

const Archive = () => {
  return (
    <>
      <div className="archive-page">
        <div className="archivewrap-content">
          <div className="achivetop-content clearfix">
            <h2>Continue Watching:</h2>
            <div className="archivetop-left">
              <div className="video-wrap">
                <img src={video} alt="" />
              </div>
            </div>
            <div className="archivetop-right">
              <div className="white-box">
                <h3>Introduction to Quran Recitation with Ramazan Mahdi.</h3>
                <h4>Ramadhan Mahdi</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                labore et dolore mag aliqua. Ut tellus elementum sagittis vitae et leo duis.
                Ac felis donec et odio pellentesque. Ultricies tristique nulla aliq enim tortor at
                auctor urna nunc. Quisque non tellus orci ac. Tincidunt arcu non sodales
                neque sodales ut etiam. Urna cursus eget nunc scelerisque viverra. Orci ac
                auctor augue mauris augue neque gravida in fermentum. Nullam egets
                      eget nunc lobortis mattis aliquam. Sed nisi lacus sed viverra tellus.</p>
                <div className="box-bottom clearfix">
                  <div className="boxbottom-left">
                    <h5>Rate this session</h5>
                    <ul className="starrating">
                      <li className="fa fa-star checked"></li>
                      <li className="fa fa-star checked"></li>
                      <li className="fa fa-star checked"></li>
                      <li className="fa fa-star checked"></li>
                      <li className="fa fa-star"></li>
                    </ul>
                  </div>
                  <div className="boxbottom-right">
                    <a href="#">Reinvite Tutor</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="achivebot-content">
            <h2>Other Saved Videos:</h2>
            <div className="archivebot-row clearfix">
              <div className="archivebot-content">
                <div className="archivebot">
                  <a href="#">
                    <div className="arvhivebot-videowrap">
                      <img src={videoImage} alt="" />
                    </div>
                    <h5>Introduction to Quran Recitation with Ramazan Mahdi.</h5>
                    <span>Ramadhan Mahdi</span>
                  </a>
                </div>
              </div>
              <div className="archivebot-content">
                <div className="archivebot">
                  <a href="#">
                    <div className="arvhivebot-videowrap">
                      <img src={videoImage} alt="" />
                    </div>
                    <h5>Introduction to Quran Recitation with Ramazan Mahdi.</h5>
                    <span>Ramadhan Mahdi</span>
                  </a>
                </div>
              </div>
              <div className="archivebot-content">
                <div className="archivebot">
                  <a href="#">
                    <div className="arvhivebot-videowrap">
                      <img src={videoImage} alt="" />
                    </div>
                    <h5>Introduction to Quran Recitation with Ramazan Mahdi.</h5>
                    <span>Ramadhan Mahdi</span>
                  </a>
                </div>
              </div>
              <div className="archivebot-content">
                <div className="archivebot">
                  <a href="#">
                    <div className="arvhivebot-videowrap">
                      <img src={videoImage} alt="" />
                    </div>
                    <h5>Introduction to Quran Recitation with Ramazan Mahdi.</h5>
                    <span>Ramadhan Mahdi</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Archive
