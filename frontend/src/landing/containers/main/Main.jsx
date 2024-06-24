import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Reviews from "../../components/reviews/Reviews";
import Features from "../../components/features/Features";
import Welcome from "../../components/welcome/Welcome";
import Why from "../../components/why/why";
import Start from "../../components/start/Start";
import Steps from "../../components/steps/Steps";
import RegisterTutor from "../../components/registerTutor/RegisterTutor";
import Slider from "../../components/slider/Slider";
import LoginModal from "../../components/userAuthorization/LoginModal/LoginModal";

import SignupModal from "../../components/userAuthorization/SignupModal/SignupModal";
import LandingLayout from "../../components/layout";
import FourOfour from "../../../404";
import LandingContainer from "../landing";
import FindStudent from "../../pages/findStudent/FindStudent";
import FindTutor from "../../pages/findTutor/FindTutor";
import AboutUs from "../../pages/aboutUs/AboutUs";
import PlanAndPricing from "../../pages/planAndPricing";
import ContactUs from "../../pages/contactUs/ContactUs";
import Faqs from "../../pages/faqs/Faqs";
import EmailVerify from "../../../VerifyEmail/VerifyEmail";
import Regulations from "../../pages/rulesAndRegulations/rulesAndRegulations";

const Main = () => {
  let { path } = useRouteMatch();

  const [isLoginModal, setLoginModal] = useState(false);
  const [isSignUpModal, setSiginUpModal] = useState(false);

  const toggleModal = (type) => {
    switch (type) {
      case "login":
        setSiginUpModal(false);
        setLoginModal(true);
        break;
      case "signup":
        setSiginUpModal(true);
        setLoginModal(false);
      default:
        break;
    }
  };

  useEffect(() => {
    // localStorage.clear()
  }, []);
  return (
    <LandingLayout
      loginClick={() => setLoginModal(true)}
      signUpClick={() => setSiginUpModal(true)}
    >
      {isLoginModal && (
        <LoginModal
          closeModal={() => setLoginModal(false)}
          showSignupModal={(type) => toggleModal(type)}
        />
      )}

      {isSignUpModal && (
        <SignupModal
          closeModal={() => setSiginUpModal(false)}
          showSignupModal={(type) => toggleModal(type)}
        />
      )}

      <Switch>
        <Route exact path={`${path}`} component={LandingContainer} />
        <Route exact path={`${path}/find-student`} component={FindStudent} />
        <Route exact path={`${path}/find-tutor`} component={FindTutor} />
        <Route exact path={`${path}/about-us`} component={AboutUs} />
        <Route exact path={`${path}/rules`} component={Regulations} />
        <Route exact path={`${path}/faqs`} component={Faqs} />
        <Route exact path={`${path}/contact-us`} component={ContactUs} />
        <Route exact path={`${path}/pricing`} component={PlanAndPricing} />

        <Route
          exact
          path={`${path}/verifyemail/:role/:id`}
          component={EmailVerify}
        />
        <Route component={FourOfour} />
      </Switch>
    </LandingLayout>
  );
};

export default Main;
