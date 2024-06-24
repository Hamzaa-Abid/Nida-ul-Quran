import React, { useState } from "react";
import "../userAuthorization.css";

// dependencies
import { useFormik } from "formik";
import axios from "../../../../axios";
import { Alert, message, Radio } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentProfileAction } from "../../../../store/Actions";
import LoaderUi from "../../../../UiLoader/Loader";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import logo from "../../../../assets/images/logo2.png";
import TwitterLogin from "react-twitter-login";

// components
import googleIcon from "../../../../assets/images/login-google.png";
import facebookIcon from "../../../../assets/images/login-facebook.png";
import twitterIcon from "../../../../assets/images/login-twitter.png";
//services
import setAuthToken from "../../../../shared/services/setAuthToken";
import { useAuth } from "../../../../Provider/AuthProvider";
const LoginModal = (props) => {
  let auth = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [isLoginType, setLoginType] = useState(null);
  const [isForgotType, setForgotType] = useState(null);
  const [forgotVisible, setForgotVisible] = useState(false);
  const [email, setEmail] = useState("");

  message.config({
    top: 10,
    rtl: true,
  });

  const initialValues = {
    email: "",
    password: "",
  };

  // form on submit function will be handle from here explicitly
  const onSubmit = async (values) => {
    localStorage.clear();
    setLoading(true);
    const route = isLoginType === 1 ? "student/login" : "tutor/login";

    try {
      const loginUser = await axios.post(route, values);
      if (loginUser.status === 200) {
        setLoading(false);

        console.log("Login User", loginUser);
        const userData = loginUser.data.data;

        const token = loginUser.data.data.token;
        console.log("tokrn", token);
        // auth.setUserState(userRole);
        //console.log("user role", userRole);
        const { email, username, _id, userRole } = userData.user;
        const { profileImage } = userData.image;
        const { firstName, lastName } = userData.profile;
        auth.setUserState(userData.user.userRole);
        console.log("user role", userData.user.userRole);
        firstName && dispatch(studentProfileAction("UPDATE_FNAME", firstName));
        lastName && dispatch(studentProfileAction("UPDATE_LNAME", lastName));
        profileImage &&
          dispatch(studentProfileAction("UPDATE_PHOTO", profileImage));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            email,
            username,
            loginId: _id,
            userRole,
            profileImage,
            firstName,
            lastName,
          })
        );

        localStorage.setItem("token", JSON.stringify(token));
        props.closeModal();
        message.loading(`Please wait`).then(() => {
          message.success({
            content: `You have successfully logged-in as ${userRole}`,
            style: {
              zIndex: "999999",
              fontSize: "20px",
            },
          });
          userRole === "student"
            ? history.push("/student")
            : userRole === "tutor"
            ? history.push("/tutor")
            : // : userRole === 'admin'
              // ? history.push('/admin')
              history.push("/admin"); // if user profile is not update route it to the student?tutor/profile
        });
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: "Authentication Failed. Email or Password may be incorrect",
        style: {
          fontSize: "22px",
          color: "red",
        },
      });
    }
  };

  // form on validation function will be handle from here explicitly

  const validate = (values) => {
    let errors = {};

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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  // console.log("form error :", formik.touched);

  const handleLoginType = (type) => {
    setLoginType(type.target.value);
  };

  const sendLink = (event) => {
    if (email == "") {
      alert("Please provide your email");
    }
    event.preventDefault();
    let resetPasswordByLink = {
      email: email,
    };
    console.log(resetPasswordByLink);
    const route =
      isForgotType === 1 ? "student/forgotpassword" : "tutor/forgotpassword";

    axios.post(route, resetPasswordByLink);
    message.loading(`Please wait`).then(() => {
      message.success({
        content: "A link has been sent to your email address",
        style: {
          zIndex: "999999",
          fontSize: "20px",
        },
      });
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleForgotType = (type) => {
    setForgotType(type.target.value);
  };
  /*
  //google handler
  const responseGoogle = (field) => {
    console.log(field);
  };
  //facebook handler
  const responseFacebook = (response) => {
    console.log(response);
  };
  const fbClick = (e) => {
    console.log(e);
  };

  //twitter
  const authTwitterHandler = (err, data) => {
    console.log(err, data);
  };
*/
  const showForgot = () => {
    setForgotVisible(true);
  };

  return (
    <>
      <div className="popup-wrap" onClick={props.closeModal}></div>
      {isLoading ? <LoaderUi /> : null}
      <div id="login" className="popup clearfix pop-up-new">
        {forgotVisible === false ? (
          <div className="popup-contentleft">
            <div className="popupcontent">
              <div className="content-box">
                <div className="content-tabsbtn">
                  <ul>
                    <li className="active">
                      <a>Log In</a>
                    </li>
                    <li>
                      <a onClick={() => props.showSignupModal("signup")}>
                        Sign Up
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="login-form">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-control">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        {...formik.getFieldProps("email")}
                        placeholder="example@gmai.com"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="error"> {formik.errors.email}</div>
                      ) : null}
                    </div>

                    <div className="form-control">
                      <label htmlFor="firstName">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        {...formik.getFieldProps("password")}
                        placeholder="Enter password here"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="error"> {formik.errors.password}</div>
                      ) : null}
                    </div>

                    <Radio.Group onChange={handleLoginType} value={isLoginType}>
                      <Radio value={1}>I am a student</Radio>
                      <Radio value={2}>I am a Tutor</Radio>
                      <Radio value={3}> I am an Admin </Radio>
                      {/*} <Radio value={3}>I am an Admin</Radio> {*/}
                    </Radio.Group>
                    <input
                      type="submit"
                      value="Log In"
                      className="default-btn"
                      disabled={!isLoginType}
                    />

                    <div className="otherinfo">
                      <label className="containercheckbox">
                        Remember Me
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      {/*}
                      <a href="" onClick={showForgot}>
                        Forgot Password?
                      </a> {*/}
                      <label className="containerForgot" onClick={showForgot}>
                        Forgot Password?
                      </label>
                    </div>
                    {/*}
                    <div
                      className="otherlogin-option"
                      style={{ display: "none" }}
                    >
                      <h6>or Log In with</h6>
                      <ul>
                        <li>
                          <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            icon={googleIcon}
                          />
                        </li>
                        <li>
                          <FacebookLogin
                            appId="338628403825930"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={fbClick}
                            callback={responseFacebook}
                          />
                        </li>
                        <li>
                          <TwitterLogin
                            authCallback={authTwitterHandler}
                            consumerKey={"CONSUMER_KEY"}
                            consumerSecret={"CONSUMER_SECRET"}
                            callbackUrl={"CALLBACK_URL"}
                          />
                        </li>
                      </ul>
                    </div>
                    {*/}
                  </form>
                </div>
              </div>
            </div>
            <p>
              © 2020 Nida Ul Quran. All rights reserved. |
              <a href="#">Privacy Policy</a>
            </p>
          </div>
        ) : (
          <div className="popup-contentleft">
            <div className="popupcontent">
              <div className="content-box">
                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    style={{ margin: "15px 0" }}
                    height="94px"
                    width="auto"
                  />
                </div>

                <div className="login-form">
                  <form onSubmit={sendLink}>
                    <div className="form-control">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        value={email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                      />
                    </div>
                    <Radio.Group
                      onChange={handleForgotType}
                      value={isForgotType}
                    >
                      <Radio value={1}>I am a student</Radio>
                      <Radio value={2}>I am a Tutor</Radio>
                    </Radio.Group>
                    <input
                      type="submit"
                      value="Send Link"
                      className="default-btn"
                      disabled={!isForgotType}
                    />
                  </form>
                </div>
              </div>
            </div>
            <p>
              © 2020 Nida Ul Quran. All rights reserved. |
              <a href="#">Privacy Policy</a>
            </p>
          </div>
        )}

        <div className="popup-contentright">
          <div className="popupcontent">
            <div className="overlaypopup"></div>
            <div className="inner-content">
              <h3>Welcome to Nida Ul Quran</h3>
              <p>
                Nida Ul Quran is an online learning platform where you can
                learnQuran, Memorization (Hifz), Tajweed, Arabic, Islamic
                studies andmuch more. With the help of highly qualified tutors,
                you candeeply understand all type of subjects offered by this
                learningplatform.
              </p>
              <a href="/home/about-us">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
