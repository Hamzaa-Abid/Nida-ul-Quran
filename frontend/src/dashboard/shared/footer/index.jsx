import React from 'react';
import './style.css'

const Footer = (props) => {
    return (
        <>
            <footer className={(props.toggle) ? "student-footer collapse-footer" : "student-footer"}>
                <div className="container-fluid">
                    <div className="footer-content clearfix">
                        <div className="student-footer-left">
                            <p>Nida Ul Quran COPYRIGHTS 2020</p>
                        </div>
                        <div className="student-footer-right">
                            <ul>
                                <li><a href="#">ABOUT US</a></li>
                                <li><a href="#">CONTACT SUPPORT</a></li>
                                <li><a href="#">TECHNICAL SUPPORT</a></li>
                                <li><a href="#">TERMS & CONDITIONS</a></li>
                                <li><a href="#">PRIVACY POLICY</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
