import React from 'react'
import './AboutUs.css'

import scholorImage3 from '../../../assets/images/scholorimg-3.png';
import scholorImage1 from '../../../assets/images/scholorimg-1.png';
import scholorImage2 from '../../../assets/images/scholorimg-2.png';

const AboutUs = () => {
    return (
        <>
            <section id="banner-wrap">
                <div className="container">
                    <div className="banner-content">
                        <h1>About Nida Ul Quran</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li>About us</li>
                        </ul>
                    </div>
                </div>
            </section>

            <article className="innerpage">
                <section id="simplestep">
                    <div className="container">
                        <div className="simplestep-content">
                            <div className="simplestep-heading">
                                <h6>Start In The Name Of Allah</h6>
                                <h2>What is Nida Ul Quran</h2>
                                <h3>Enlightening the Hearts with Knowledge!	</h3>
                                <p>Nida Ul Quran is an online learning platform where you can learn Quran, Memorization (Hifz), Tajweed, Arabic, Islamic studies and much more. With the help of highly qualified tutors, you can deeply understand all type of subjects offered by this learning platform.
                                Learn easily and efficiently in various languages from comfort of your home without having to download any software. You can track your progress and learn without any limitations.

                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="why-alkitaab">
                    <div className="container">
                        <div className="kitaab-box-wrap">
                            <div className="kitaab-box">
                                <div className="section-img">
                                    <img src={scholorImage1} alt="" />
                                </div>
                                <div className="section-content">
                                    <h3>Our Mission</h3>
                                    <p>Our mission is to establish effective and authentic teaching methodologies to provide everyone with the comprehensive learning of Quran and other related subjects.
                                    </p>
                                </div>
                            </div>
                            <div className="kitaab-box">
                                <div className="section-img">
                                    <img src={scholorImage2} alt="" />
                                </div>
                                <div className="section-content">
                                    <h3>Our Vision</h3>
                                    <p>We envision a world which is enlightened with the spirit of learning. The education of Quran should spread to each corner of the world enlightening the hearts of every nation.
                                    </p>
                                </div>
                            </div>
                            <div className="kitaab-box mr-0">
                                <div className="section-img">
                                    <img src={scholorImage3} alt="" />
                                </div>
                                <div className="section-content">
                                    <h3>Our Values</h3>
                                    <p>We envision a world which is enlightened with the spirit of learning. The education of Quran should spread to each corner of the world enlightening the hearts of every nation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="registertutor">
                    <div className="container">
                        <h2>A Place To Pray And A<br />
                            Community Center To Learn</h2>
                        <div className="community-content">
                            <p>Assalaam -o- Alaikum!</p>
                            <p>We envision a world which is enlightened with the spirit of learning. The education of Quran should spread to each corner of the world enlightening the hearts of every nation.</p>
                            <span>-- Mustafa Al-Hamid (Director)</span>
                        </div>
                    </div>
                </section>

                {/* <section id="simplestep" className="boardscholors">
                    <div className="container">
                        <div className="simplestep-content">
                            <div className="simplestep-heading">
                                <h6></h6>
                                <h2>Board Of Scholors</h2>
                                <h3>“A scholar whose knowledge is useful for others is preferred to seventy thousand worshippers.”
                                <span>( Imam al-Baqir - 418 )</span>
                                </h3>
                            </div>
                            <div className="scholors-wrap clearfix">
                                <div className="scholors">
                                    <div className="scholor-img">
                                        <img src={scholorImage1} alt="" />
                                    </div>
                                    <div className="scholor-content">
                                        <span>Director</span>
                                        <h4>Hamad Bin Jasim</h4>
                                        <ul>
                                            <li className="facebook"><a href="#"></a></li>
                                            <li className="twitter"><a href="#"></a></li>
                                            <li className="linkedin"><a href="#"></a></li>
                                            <li className="youtube"><a href="#"></a></li>
                                        </ul>
                                        <p>Less darn overheard forward some drink pat
                                        this ipsum free immodest less aim ipsum dolor
                                        amet consecter adipisice eiusmod.</p>
                                    </div>
                                </div>
                                <div className="scholors">
                                    <div className="scholor-img">
                                        <img src={scholorImage2} alt="" />
                                    </div>
                                    <div className="scholor-content">
                                        <span>Islamic Scholor, Ph. D</span>
                                        <h4>Ashraf Al-Maktum</h4>
                                        <ul>
                                            <li className="facebook"><a href="#"></a></li>
                                            <li className="twitter"><a href="#"></a></li>
                                            <li className="linkedin"><a href="#"></a></li>
                                            <li className="youtube"><a href="#"></a></li>
                                        </ul>
                                        <p>Less darn overheard forward some drink pat
                                        this ipsum free immodest less aim ipsum dolor
                                        amet consecter adipisice eiusmod.</p>
                                    </div>
                                </div>
                                <div className="scholors mr-0">
                                    <div className="scholor-img">
                                        <img src={scholorImage3} alt="" />
                                    </div>
                                    <div className="scholor-content">
                                        <span>Hafiz Quran Scholor</span>
                                        <h4>Sayyida Hijaazi</h4>
                                        <ul>
                                            <li className="facebook"><a href="#"></a></li>
                                            <li className="twitter"><a href="#"></a></li>
                                            <li className="linkedin"><a href="#"></a></li>
                                            <li className="youtube"><a href="#"></a></li>
                                        </ul>
                                        <p>Less darn overheard forward some drink pat
                                        this ipsum free immodest less aim ipsum dolor
                                         amet consecter adipisice eiusmod.</p>
                                    </div>
                                </div>
                                <a href="#" className="default-btn">View More</a>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section id="simplestep" className="boardscholors">
                    <div className="container">
                        <div className="simplestep-content">
                            <div className="simplestep-heading">
                                <h6></h6>
                                <h2>Why Nida Ul Quran</h2>
                                <h3>“A scholar whose knowledge is useful for others is preferred to seventy thousand worshippers.”
                                <span>( Imam al-Baqir - 418 )</span>
                                </h3>
                            </div>
                            <div className="scholors-wrap clearfix">
                                <div className="scholors">
                                    <div className="scholor-content">
                                        <h4>1. Qualified Tutors</h4>
                                        <p>Learn and better understand from our verified professional tutors. We allow you to select the teacher of your choice for your preferred course and start learning effectively.</p>
                                    </div>
                                </div>
                                <div className="scholors">
                                    <div className="scholor-content">
                                        <h4>2. Unlimited Learning</h4>
                                        <p>We believe education should never be restricted. Learn as much you desire from our top qualified tutors without any limitation! You can easily schedule your classes in “Book your Schedule” to help you learn Quran and related subjects as per your convenience.</p>
                                    </div>
                                </div>
                                <div className="scholors">
                                    <div className="scholor-content">
                                        <h4>3. No-age Restrictions</h4>
                                        <p>It is never too early or too late for learning. Learning is a lifetime process, so start learning today despite your age. Students as young as 4 years can enroll in our platform.</p>
                                    </div>
                                </div>
                                <div className="scholors">
                                    <div className="scholor-content">
                                        <h4>4. Safe Learning</h4>
                                        <p>Learn in a safe environment, interact with tutors without worrying about anything. We keep your data safe and our team is always there to make sure you achieve the best out of this platform. </p>
                                    </div>
                                </div>
                                <div className="scholors">
                                    <div className="scholor-content">
                                        <h4>5. Female & Male Tutors</h4>
                                        <p>We have male and female tutors available. You can hire female tutors for your children and females. You can learn at home comfortably and without any hesitation</p>
                                    </div>
                                </div>
                                <div className="scholors">
                                    <div className="scholor-content">
                                        <h4>6. Multilingual Platform</h4>
                                        <p>Learn in various languages! Our diversified tutors have the ability to teach in the language you or your child understand. Use ‘Find Tutor’ function to filter tutors as per your requirement and start learning today.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </article>

        </>
    )
}

export default AboutUs
