import React from 'react'
import './style.css'

import videoImage from '../../../assets/images/video-img.jpg'

const Faqs = () => {
    return (
        <>
            <section id="helpsupport-page">
                <div className="container">
                    <h2>HELP & SUPPORT</h2>
                    <p>Please watch the videos below for guidance and see how Nida Ul Quran works on laptop and desktop computer.</p>
                    <div className="helpsupport-wrap">
                        <div className="helpsupport-content">
                            <div className="helpsupport">
                                <h4>How I Setup Chrome for Nida Ul Quran?</h4>
                                <div className="video-wrap">
                                    <img src={videoImage} alt="" />
                                </div>
                            </div>
                            <div className="helpsupport">
                                <h4>How I Setup Firefox for Nida Ul Quran?</h4>
                                <div className="video-wrap">
                                    <img src={videoImage} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="helpsupport-content">
                            <div className="helpsupport">
                                <h4>How to Find Tutors on Nida Ul Quran?</h4>
                                <div className="video-wrap">
                                    <img src={videoImage} alt="" />
                                </div>
                            </div>
                            <div className="helpsupport">
                                <h4>How to Start a class in Nida Ul Quran?</h4>
                                <div className="video-wrap">
                                    <img src={videoImage} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="tutoronly">
                            <h2>FOR TUTORS ONLY</h2>
                            <p>This video is not relevant to students.</p>
                            <div className="tutorvideo">
                                <h4>How do I Sign Up as a Tutor on Nida Ul Quran?</h4>
                                <div className="video-wrap">
                                    <img src={videoImage} alt="" />
                                </div>
                                <p>If your questions have not been answered by the videos, please email <a href="mailto:systemhelp@alkitaab.com">systemhelp@alkitaab.com</a>
                                    <br />and one of our technicians will assist you in shaa Allah.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Faqs
