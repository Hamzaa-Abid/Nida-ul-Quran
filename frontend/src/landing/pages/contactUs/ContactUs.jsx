import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useFormik } from 'formik';
import { message } from 'antd';
import { useHistory } from "react-router-dom";
import './style.css';

const ContactUs = () => {

    let history = useHistory();
   // const baseUrl = 'https://qtutor.azurewebsites.net/contactus';
   const baseUrl = "http://localhost:5500/";
    const formik = useFormik({

        initialValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        },

        onSubmit: async values => {
            try {
                console.log(values);
                const data = Axios.post(baseUrl, values);
                if (data) {
                    message.success('Email sent successfully!');
                    history.push('/');
                }
            } catch (error) {
                message.error('something went wrong, please try again :(');
            }
        },

    });


    return (
        <>
            <section id="banner-wrap" >
                <div className="container">
                    <div className="banner-content">
                        <h1>Contact us</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li>Contact</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section id="contact-page">
                <div className="container">
                    <div className="contactinfo-wrap">
                        <div className="contantinfo">
                            <h4>Our Location</h4>
                            <p>12612 Kennedy Road, Caledon, Ontario, Canada</p>
                        </div>
                        <div className="contantinfo">
                            <h4>Phone us</h4>
                            <ul>
                                <li><a href="callto:1-6479279151">1-6479279151</a></li>
                                <br/>
                                <br/>
                                {/* <li><a href="callto:0800-23011">0800-23011</a></li> */}
                            </ul>
                        </div>
                        <div className="contantinfo mr-0">
                            <h4>Email us</h4>
                            <ul>
                                <li><a href="mailto:info@alkitaab.com">contact@nidaulquran.com</a></li>
                                <li><a href="nidaulquran2020@gmail.com">nidaulquran2020@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="contactform-wrap">
                        <h3>Send a Message</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="inputgroup-wrap">
                                <div className="input-wrap">
                                    <input type="text"
                                        placeholder="Your Name *"
                                        name="name"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.name} />
                                </div>
                                <div className="input-wrap">
                                    <input type="email"
                                        placeholder="Email*"
                                        name="email"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.email} />
                                </div>
                            </div>
                            <div className="inputgroup-wrap">
                                <div className="input-wrap">
                                    <input type="tel"
                                        placeholder="Phone No"
                                        name="phone"
                                        placeholder="888 888 8888"
                                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                        maxlength="12"
                                        title="Ten digits code"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.phone} />
                                </div>
                                <div className="input-wrap">
                                    <input type="text"
                                        placeholder="Subject"
                                        name="subject"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.subject} />
                                </div>
                            </div>
                            <div className="inputgroup-wrap">
                                <textarea rows="5"
                                    cols="10"
                                    placeholder="Message"
                                    name="message"
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.message}></textarea>
                            </div>
                            <button type="submit" className="default-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactUs
