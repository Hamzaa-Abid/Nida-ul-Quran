import React from 'react';
import './style.css';

import MsgWhiteIcon from '../../../../assets/images/msg-iconwhite.png';
import CallWhiteIcon from '../../../../assets/images/videocall-icon.png';
import userImage from '../../../../assets/images/image.jpg';
import VideoImage from '../../../../assets/images/videoimg.png';

const ParentalWatch = () => {
    return (
        <>
            <div className="parentalwatch-page">
                <div className="parentalwatch-tabs">
                    <ul>
                        <li><a className="active" href="#parental-upcoming">Upcoming Sessions</a></li>
                        <li><a href="#parental-past">Past Sessions</a></li>
                        <li><a href="#parental-missed">Missed Sessions</a></li>
                    </ul>
                </div>
                <div className="overviewtab-row clearfix">
                    <div className="overviewtab-content-left">
                        <div className="parentalwatchtab-content">
                            <div className="parentalwatch-content" id="parental-upcoming" style={{ display: 'block' }}>
                                <h3>Abdul Rehman’s Upcoming Sessions</h3>
                                <div className="currenttutuors-tab">
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="asd" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="parentalwatch-content" id="parental-past">
                                <h3>Abdul Rehman’s Past Sessions</h3>
                                <div className="currenttutuors-tab">
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div >
                                </div >
                            </div >
                            <div className="parentalwatch-content" id="parental-missed">
                                <h3>Abdul Rehman’s Missed Sessions</h3>
                                <div className="currenttutuors-tab">
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div >
                                    <div className="reusedbox-content clearfix">
                                        <div className="image-wrap">
                                            <img src={userImage} alt="" />
                                        </div>
                                        <div className="boxcontent">
                                            <p>Recitation with <a href="#">Ramadan Mahdi</a></p>
                                            <span>Next session in:</span>
                                            <em>10h:03m</em><br />
                                            <a href="#" className="btn-cancel">Cancel</a>
                                            <a href="#" className="btn-cancelborder">End this Contract</a>
                                        </div>
                                        <div className="box-otherlinks">
                                            <ul>
                                                <li><a href="#" className="bluebox"><img src={MsgWhiteIcon} alt="" /></a></li>
                                                <li><a href="#" className="greenbox"><img src={CallWhiteIcon} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                    <div className="overviewtab-content-right">
                        <h3>PERFORMANCE OVERVIEW</h3>
                        <div className="overviewtabright-row clearfix">
                            <div className="tabright-boxleft">
                                <div className="rightbox-white">
                                    <h3>TOTAL HOURS OF<br /> LEARNING</h3>
                                    <div className="overviewgraph-wrap">
                                      {/* asdadasdasd */}
                                    </div>
                                </div>
                            </div>
                            <div className="tabright-boxright">
                                <div className="rightbox-white">
                                    <h3>TOTAL TUTORS <br /> HIRED</h3>
                                    <div className="overviewgraph-wrap">
                                        <img src="images/tutorhired-graph.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className="overviewtabright-row clearfix">
                            <div className="tabright-boxleft">
                                <div className="rightbox-white">
                                    <h3>TOTAL SESSIONS<br /> ATTENDED</h3>
                                    <div className="overviewgraph-wrap">
                                        <img src="images/sessionattend-graph.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="tabright-boxright">
                                <div className="rightbox-white">
                                    <h3>TOTAL SESSION<br /> MISSED</h3>
                                    <div className="overviewgraph-wrap">
                                        <img src="images/sessionmissed-graph.png" alt="" />
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                </div >
                <div className="archive-page">
                    <div className="archivewrap-content">
                        <div className="achivebot-content">
                            <h2>Watch Previous Sessions</h2>
                            <div className="archivebot-row clearfix">
                                <div className="archivebot-content">
                                    <div className="archivebot">
                                        <a href="#">
                                            <div className="arvhivebot-videowrap">
                                                <img src={VideoImage} alt="" />
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
                                                <img src={VideoImage} alt="" />
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
                                                <img src={VideoImage} alt="" />
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
                                                <img src={VideoImage} alt="" />
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
            </div >
        </>
    )
}

export default ParentalWatch
