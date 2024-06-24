import React, { useState, useEffect } from "react";
import "../userAuthorization.css";
import { useFormik } from "formik";
import { message, notification } from "antd";
import axiosInstance from "../../../../axios";

import googleIcon from "../../../../assets/images/login-google.png";
import facebookIcon from "../../../../assets/images/login-facebook.png";
import twitterIcon from "../../../../assets/images/login-twitter.png";
import StudentIcon from "../../../../assets/images/studenticon.png";
import TutorIcon from "../../../../assets/images/tutoricon.png";
import LoaderUi from "../../../../UiLoader/Loader";

import { countries } from "../../../../shared/countriesData/CountriesData";
import { timezone } from "../../../../shared/timeZoneData/TimeZone";

const SignupModal = (props) => {
  const [isStudentSignup, setStudentSignup] = useState(false);
  const [isTutorSignup, setTutorSignup] = useState(false);
  const [isTutorSignupStep, setTutorSignupStep] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [allCountries, setCountries] = useState(null);
  const [allTimeZones, setTimeZones] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const studentInitialValues = {
    username: "",
    email: "",
    password: "",
  };

  // student form on submit function will be handle from here explicitly
  const studentOnSubmit = async (values) => {
    console.log("HIT");
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      userRole: "student",
      link: "https://nida-ul-quran.web.app/home",
    };
    try {
      const signupUser = await axiosInstance.post("student/signup", data);
      if (signupUser.status === 200) {
        // props.closeModal();
        setLoading(true);
        message
          .loading("Creating account.....")
          .then(() => {
            notification.success({
              message: "Your Account",
              description:
                "Account created successfully and Verification Link has been sent to your Email please Verify before login.",
              className: "custom-class",
              duration: 0,
              placement: 'topLeft',
              style: {
                width: '600',
              },
            });
          })
          .then(() => {
            setLoading(false);
            props.closeModal();
            props.showSignupModal("login");
          });
      }
    } catch (error) {
      message.error('This email address is already taken!');
    }
  };

  //student form validating
  const studentValidate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Enter user namee";
    }
    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Please fill the password field";
    }
    return errors;
  };

  const studentFormik = useFormik({
    initialValues: studentInitialValues,

    onSubmit: studentOnSubmit,
    validate: studentValidate,
  });

  console.log("studnet error", studentFormik.errors);

  const tutorIntialValues = {
    username: "",
    email: "",
    password: "",
    country: "",
    timeZone: "",
    city: "",
    skills: "",
    link: "https://nida-ul-quran.web.app/home",
  };

  //tutor form on submit function will be handle from here explicitly
  const tutorOnSubmit = async (values) => {
    console.log("HIT");
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      country: values.country,
      timezone: values.timezone,
      city: values.city,
      skills: values.skills,
      userRole: "tutor",
    };
    console.log("tutor data", data);
    try {
      if (isChecked) {
        const signupUser = await axiosInstance.post("tutor/signup", data);
        if (signupUser.status === 200) {
          setLoading(true);
          setSubmitted(false);
          message
            .loading("Creating account.....")
            .then(() => {
              notification.success({
                message: "Your Account",
                description:
                  "Account created successfully and Verification Link has been sent to your Email please Verify before login.",
                className: "custom-class",
                duration: 0,
                style: {
                  width: '600',
                },
              });
            })
            .then(() => {
              setLoading(false);
              props.closeModal();
              props.showSignupModal("login");
            });
        }
      }
    } catch (error) {
      message.error("This email address is already taken");
    }
  };
  // tutor validation function
  const tutorValidate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "Enter Tutor user name ";
    }
    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Please fill the password field";
    }
    if (!values.city) {
      errors.city = "Select your city";
    }
    return errors;
  };

  const tutorFormik = useFormik({
    initialValues: tutorIntialValues,

    onSubmit: tutorOnSubmit,
    validate: tutorValidate,
  });
  console.log("tutor errors:", tutorFormik.errors);

  const termsAndConditionsHAndler = (check) => {
    console.log("termsAndConditionsHAndler", check.target.checked);
    setChecked(!isChecked);
  };
  useEffect(() => {
    setCountries(countries);
    setTimeZones(timezone);
  }, []);

  return (
    <>
      <div className="popup-wrap" onClick={props.closeModal}></div>
      {isLoading ? <LoaderUi /> : null}
      <div id="signup" className="popup clearfix pop-up-new">
        <div className="popup-contentleft">
          <div className="popupcontent">
            <div className="content-box">
              <div className="content-tabsbtn">
                <ul>
                  <li>
                    <a onClick={() => props.showSignupModal("login")}>Log In</a>
                  </li>
                  <li
                    className="active"
                    onClick={() => {
                      setStudentSignup(false);
                      setTutorSignup(false);
                      setTutorSignupStep(false);
                    }}
                  >
                    <a>Sign Up</a>
                  </li>
                </ul>
              </div>

              {/* student SignUp Form */}
              {isStudentSignup ? (
                <>
                  <div className="login-form">
                    <form onSubmit={studentFormik.handleSubmit}>
                      <div className="form-control">
                        <label htmlFor="email">User Name</label>
                        <input
                          id="username"
                          name="username"
                          type="username"
                          {...studentFormik.getFieldProps("username")}
                          placeholder="Student name"
                        />
                        {studentFormik.touched.username &&
                        studentFormik.errors.username ? (
                          <div className="error">
                            {" "}
                            {studentFormik.errors.username}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-control">
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          {...studentFormik.getFieldProps("email")}
                          placeholder="example@abc.com"
                        />
                        {studentFormik.touched.email &&
                        studentFormik.errors.email ? (
                          <div className="error">
                            {" "}
                            {studentFormik.errors.email}
                          </div>
                        ) : null}
                      </div>

                      <label htmlFor="firstName">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        {...studentFormik.getFieldProps("password")}
                        placeholder="Enter passowrd"
                      />
                      {studentFormik.touched.password &&
                      studentFormik.errors.password ? (
                        <div className="error">
                          {" "}
                          {studentFormik.errors.password}
                        </div>
                      ) : null}

                      <input
                        type="submit"
                        value="Sign up"
                        className="default-btn"
                      />
                    </form>
                  </div>
                </>
              ) : isTutorSignup ? (
                <>
                  <div id="signuptutorstep-1" className="login-form">
                    <form>
                      <div>
                        <label>User Name</label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          {...tutorFormik.getFieldProps("username")}
                          placeholder="Enter tutor name"
                        />
                        {tutorFormik.touched.username &&
                        tutorFormik.errors.username ? (
                          <div className="error">
                            {" "}
                            {tutorFormik.errors.username}
                          </div>
                        ) : null}
                      </div>

                      <label>Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        {...tutorFormik.getFieldProps("email")}
                        placeholder="exameple@abc.com"
                      />
                      {tutorFormik.touched.email && tutorFormik.errors.email ? (
                        <div className="error">{tutorFormik.errors.email}</div>
                      ) : null}
                      <label>Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        {...tutorFormik.getFieldProps("password")}
                        placeholder="Enter password"
                      />
                      {tutorFormik.touched.password &&
                      tutorFormik.errors.password ? (
                        <div className="error">
                          {tutorFormik.errors.password}
                        </div>
                      ) : null}
                      <label>Confirm Password</label>
                      <input
                        id="confirmPassword"
                        name="confirmpassword"
                        type="password"
                        {...tutorFormik.getFieldProps("confirmpassword")}
                        placeholder="Confirm password"
                      />
                      {tutorFormik.touched.password &&
                      tutorFormik.errors.password ? (
                        <div className="error">
                          {tutorFormik.errors.password}
                        </div>
                      ) : null}

                      <a
                        className="default-btn"
                        onClick={() => {
                          setTutorSignupStep(true);
                          setTutorSignup(false);
                          setStudentSignup(false);
                        }}
                      >
                        Next
                      </a>
                      <div className="round-btn">
                        <ul>
                          <li
                            onClick={() => {
                              setTutorSignup(true);
                              setTutorSignupStep(false);
                            }}
                          >
                            <a className="active"></a>
                          </li>
                          <li
                            onClick={() => {
                              setTutorSignup(false);
                              setTutorSignupStep(true);
                            }}
                          >
                            <a></a>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </>
              ) : isTutorSignupStep ? (
                <>
                  <div id="signuptutorstep-2" className="login-form">
                    <form onSubmit={tutorFormik.handleSubmit}>
                      <label>Country</label>
                      <select
                        id="country"
                        name="country"
                        value={tutorFormik.values.country}
                        onChange={tutorFormik.handleChange}
                        onBlur={tutorFormik.handleBlur}
                      >
                        <option value="default">Select country</option>
                        {allCountries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      <label>Time Zone</label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={tutorFormik.values.timezone}
                        onChange={tutorFormik.handleChange}
                        onBlur={tutorFormik.handleBlur}
                      >
                        <option value="default">Select timezone</option>
                        {timezone.map((tmz) => (
                          <option value={tmz.text}>{tmz.text}</option>
                        ))}
                      </select>

                      <label>City</label>
                      <div className="form-control">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          {...tutorFormik.getFieldProps("city")}
                        />
                        {tutorFormik.touched.city && tutorFormik.errors.city ? (
                          <div className="error">{tutorFormik.errors.city}</div>
                        ) : null}
                      </div>
                      <div className="more-skills">
                        <label>I Can Teach</label>
                        <label className="containercheckbox">
                          Recitation
                          <input
                            type="checkbox"
                            name="skills"
                            value="recitation"
                            onChange={tutorFormik.handleChange}
                            onBlur={tutorFormik.handleBlur}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label className="containercheckbox">
                          Arabic
                          <input
                            type="checkbox"
                            name="skills"
                            value="arabic"
                            onChange={tutorFormik.handleChange}
                            onBlur={tutorFormik.handleBlur}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label className="containercheckbox">
                          Hifz
                          <input
                            type="checkbox"
                            name="skills"
                            value="hifz"
                            onChange={tutorFormik.handleChange}
                            onBlur={tutorFormik.handleBlur}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label className="containercheckbox">
                          Tajweed
                          <input
                            type="checkbox"
                            name="skills"
                            value="tajweed"
                            onChange={tutorFormik.handleChange}
                            onBlur={tutorFormik.handleBlur}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label className="containercheckbox">
                          Islamic Studies
                          <input
                            type="checkbox"
                            name="skills"
                            value="Islamic Studies"
                            onChange={tutorFormik.handleChange}
                            onBlur={tutorFormik.handleBlur}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="otherinfo">
                        <label
                          className="containercheckbox"
                          onChange={termsAndConditionsHAndler}
                        >
                          I have read and agree to the{" "}
                          <a href="/home/rules"> terms of use</a>
                          <input type="checkbox" checked={isChecked} />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      {!isChecked && (
                        <p style={{ color: "crimson", fontSize: "12px" }}>
                          You have to accept terms and conditions befor signup{" "}
                        </p>
                      )}
                      <input
                        type="submit"
                        value="Sign Up"
                        className="default-btn"
                      />
                      <div className="round-btn">
                        <ul>
                          <li
                            onClick={() => {
                              setTutorSignup(true);
                              setTutorSignupStep(false);
                            }}
                          >
                            <a></a>
                          </li>
                          <li
                            onClick={() => {
                              setTutorSignup(false);
                              setTutorSignupStep(true);
                            }}
                          >
                            <a className="active"></a>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="login-form">
                    <form>
                      <div className="signup-option">
                        <ul>
                          <li>
                            <a
                              className="studentsignup"
                              onClick={() => setStudentSignup(true)}
                            >
                              <span>
                                <img src={StudentIcon} alt="" />
                              </span>{" "}
                              <em>Sign Up As A Student</em>
                            </a>
                          </li>
                          <li onClick={() => setTutorSignup(true)}>
                            <a className="tutorsignup">
                              <span>
                                <img src={TutorIcon} alt="" />
                              </span>{" "}
                              <em>Sign Up As A Tutor</em>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
          <p>
            © 2020 Nida Ul Quran. All rights reserved. | <a>Privacy Policy</a>
          </p>
        </div>
        <div className="popup-contentright">
          <div className="popupcontent">
            <div className="overlaypopup"></div>
            <div className="inner-content">
              {isStudentSignup ? (
                <>
                  {/* if signup as student then content is*/}
                  <div className="content">
                    <h3>Sign Up As Student</h3>
                    <h4>Rules and Regulations for Tutor</h4>
                    <div className="rules-wrapper">
                      <p>
                        1.There should not be unnecessary disturbances or
                        background noise during the Class.{" "}
                      </p>
                      <p>
                        2.The teacher must not be late for the class, all
                        classes must commence on the scheduled time, if the
                        teacher is late more then once then appropriate steps
                        against the teacher will be taken.
                      </p>
                      <p>
                        3.The class should not be left earlier then its due
                        completion time.
                      </p>
                      <p>
                        4.If the teacher has to miss a scheduled class due to
                        some personal emergency, then he/she has to inform the
                        students in advance and reschedule the class.
                      </p>
                      <p>
                        5.The mode of communication should be respectful, and
                        the teacher should be professional in his conduct with
                        the student.
                      </p>
                      <p>
                        6.The teachers inactive on the platform for more then
                        three weeks will be removed.
                      </p>
                      <p>
                        7.The profile information should be filled out in
                        complete and honestly, if the teacher is found out to
                        have filled fake information then appropriate steps
                        against him will be taken.
                      </p>
                      <p>
                        8.The management is not to be harassed by the teacher
                        about any matter. Full support will be provided to the
                        teacher at every step of the way.
                      </p>
                      <p>
                        9.The web portal is to be used to convey authentic
                        knowledge only, extremism is always to be avoided when
                        it comes to teaching Islamic literature. Any teacher
                        found guilty of any sort of suspicious activity will be
                        dealt with seriously.
                      </p>
                      <stron>
                        <p>Barak Allahu Feekum!</p>
                      </stron>
                    </div>
                  </div>
                </>
              ) : isTutorSignup || isTutorSignupStep ? (
                <>
                  <div className="content">
                    <h3>Sign Up As Tutor</h3>
                    <h4>Rules and Regulations for Tutor</h4>
                    <div className="rules-wrapper">
                      <p>
                        1.There should not be unnecessary disturbances or
                        background noise during the Class.{" "}
                      </p>
                      <p>
                        2.The teacher must not be late for the class, all
                        classes must commence on the scheduled time, if the
                        teacher is late more then once then appropriate steps
                        against the teacher will be taken.
                      </p>
                      <p>
                        3.The class should not be left earlier then its due
                        completion time.
                      </p>
                      <p>
                        4.If the teacher has to miss a scheduled class due to
                        some personal emergency, then he/she has to inform the
                        students in advance and reschedule the class.
                      </p>
                      <p>
                        5.The mode of communication should be respectful, and
                        the teacher should be professional in his conduct with
                        the student.
                      </p>
                      <p>
                        6.The teachers inactive on the platform for more then
                        three weeks will be removed.
                      </p>
                      <p>
                        7.The profile information should be filled out in
                        complete and honestly, if the teacher is found out to
                        have filled fake information then appropriate steps
                        against him will be taken.
                      </p>
                      <p>
                        8.The management is not to be harassed by the teacher
                        about any matter. Full support will be provided to the
                        teacher at every step of the way.
                      </p>
                      <p>
                        9.The web portal is to be used to convey authentic
                        knowledge only, extremism is always to be avoided when
                        it comes to teaching Islamic literature. Any teacher
                        found guilty of any sort of suspicious activity will be
                        dealt with seriously.
                      </p>
                      <stron>
                        <p>Barak Allahu Feekum!</p>
                      </stron>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* signup general content  */}
                  <h3>Sign up to Nida Ul Quran</h3>
                  <p>
                    Nida Ul Quran is an online learning platform where you can
                    learnQuran, Memorization (Hifz), Tajweed, Arabic, Islamic
                    studies andmuch more. With the help of highly qualified
                    tutors, you candeeply understand all type of subjects
                    offered by this learningplatform.
                  </p>
                  <a href="/home/about-us">Read more ...</a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
