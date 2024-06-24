import React, { useEffect, useState } from "react";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import "./header.css";
import getUserInfo from "../../../shared/Helpers/getUserInfo";
import hijri from "hijri";

const Header = ({ loginClick, signUpClick }) => {
  let { url } = useRouteMatch();
  let history = useHistory();

  const [isUser, setUser] = useState({});
  const [isPrayerTimings, setPrayerTimings] = useState({});

  const hijriDate = () => {
    const date = new Date();
    const hijriDate = hijri.convert(date, 0);
    const { dayOfWeekText, monthText, year } = hijriDate;
    const prayersTimingObj = {
      hijri: `${dayOfWeekText}  ${monthText}  ${year}`,
    };

    setPrayerTimings(prayersTimingObj);
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      res && setUser(res);
      console.log("menu", res);
    });
    hijriDate();
  }, []);

  return (
    <>
      <header id="header">
        <div className="topbar-wrap">
          <div className="container">
            <div className="topbar-content clearfix">
              <div className="topbar-left">
                <ul className="topbar-ul">
                  <li>
                    <i className="fas fa-calendar-alt"></i>
                    <span style={{ paddingTop: "5px" }}>
                      {isPrayerTimings.hijri}
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-sun"></i>
                    <span>Sunrise at 6:37am</span>
                  </li>
                  <li>
                    <i className="fas fa-moon"></i>
                    <span>Sunset at 6:05pm</span>
                  </li>
                </ul>
              </div>
              <div className="topbar-right">
                <div className="connectbtn-wrap">
                  <ul>
                    {!isUser.userRole ? (
                      <>
                        <li onClick={loginClick}>
                          <a>LOG IN</a>
                        </li>
                        <li onClick={signUpClick}>
                          <a>SIGN UP</a>
                        </li>
                      </>
                    ) : (
                      <li onClick={() => history.push(`/${isUser.userRole}`)}>
                        <a>{isUser.userRole} &nbsp; Dashboard</a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-wrap">
          <div className="container">
            <div className="header-content clearfix">
              <div className="header-left">
                <ul>
                  {isUser.userRole === "student" ? (
                    <li>
                      <NavLink
                        to={`${url}/find-tutor`}
                        activeClassName="activeAncher"
                      >
                        <a>Find Tutors</a>
                      </NavLink>
                    </li>
                  ) : isUser.userRole === "tutor" ? (
                    <li>
                      <NavLink
                        to={`${url}/find-student`}
                        activeClassName="activeAncher"
                      >
                        <a>Find Students</a>
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <li>
                        <NavLink
                          to={`${url}/find-tutor`}
                          activeClassName="activeAncher"
                        >
                          <a>Find Tutors</a>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`${url}/find-student`}
                          activeClassName="activeAncher"
                        >
                          <a>Find Students</a>
                        </NavLink>
                      </li>
                    </li>
                  )}

                  <li>
                    <NavLink
                      to={`${url}/about-us`}
                      activeClassName="activeAncher"
                    >
                      <a>About Us</a>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="header-middle">
                <NavLink to={`${url}`} activeClassName="activeAncher">
                  <div className="header-logo">
                    <a></a>
                  </div>
                </NavLink>
              </div>
              <div className="header-right">
                <ul>
                  <li>
                    <NavLink
                      to={`${url}/pricing`}
                      activeClassName="activeAncher"
                    >
                      <a>Plan & Pricing</a>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/contact-us`}
                      activeClassName="activeAncher"
                    >
                      <a>Contact Us</a>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${url}/faqs`} activeClassName="activeAncher">
                      <a>Faqs</a>
                    </NavLink>
                  </li>
                  <li>
                    <a>
                      <i className="fas fa-search"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
