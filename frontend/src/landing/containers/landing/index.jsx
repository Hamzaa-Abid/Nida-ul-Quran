import React from "react";
import Welcome from "../../components/welcome/Welcome";
import Why from "../../components/why/why";
import Start from "../../components/start/Start";
import RegisterTutor from "../../components/registerTutor/RegisterTutor";
import Features from "../../components/features/Features";
import Reviews from "../../components/reviews/Reviews";
import Slider from "../../components/slider/Slider";
import Steps from "../../components/steps/Steps";

const LandingContainer = () => {
  return (
    <>
      <Slider />
      <Welcome />
      <Why />
      <Start />
      <Steps />
      <RegisterTutor />
      <Features />
      <Reviews />
    </>
  );
};

export default LandingContainer;
