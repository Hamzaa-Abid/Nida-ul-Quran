import React from "react";
import "./slider.css";
import bismillah from "../../../assets/images/bismillah-img.png";

import SlickSlider from "react-slick";

const Sliders = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section id="slider-wrap">
      <SlickSlider {...settings}>
        <div className="slidercontent-wrap bg1">
          <div className="slider-overlay"></div>
          <div className="slider-content">
            <div className="bismillah-img">
              <img src={bismillah} alt="Bismillah" />
            </div>
            <h2>"My Lord, increase me in knowledge." (Quran, 20:114)</h2>
          </div>
        </div>
        <div className="slidercontent-wrap bg2">
          <div className="slider-overlay"></div>
          <div className="slider-content">
            <div className="bismillah-img">
              <img src={bismillah} alt="Bismillah" />
            </div>
            <h2>Begin your Spiritual Journey to learning Quran, Arabic, Tajweed or Islamic Studies</h2>
          </div>
        </div>
      </SlickSlider>
    </section>
  );
};

export default Sliders;
