import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import "./style.css";
import { message, Select, Empty, Spin } from "antd";
import "antd/dist/antd.css";
import "react-input-range/lib/css/index.css";

import { useFormik } from "formik";
import userImage from "../../../assets/images/userimg.jpg";
import messageIcon from "../../../assets/images/msg-iconwhite.png";
import getUserInfo from "../../../shared/Helpers/getUserInfo";
import LoaderUi from "../../../UiLoader/Loader";
import InputRange from "react-input-range";
import { countries } from "../../../shared/countriesData/CountriesData";
import { timezone } from "../../../shared/timeZoneData/TimeZone";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
const FindTutor = () => {
  const { Option } = Select;
  const [isAllTutors, setAllTutor] = useState([]);
  const [isPriceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [isFilterContactList, setFilterContactList] = useState([]);
  const [isUserInfo, setUserInfo] = useState({});
  const [isInvitedId, setInvitedId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [isStatus, setStatus] = useState([]);
  const [isSubjects, setSubjects] = useState([]);
  const [isLanguages, setLanguages] = useState([]);
  const [isGender, setGender] = useState([]);
  const [isCountry, setCountry] = useState("");
  const [isTimeZone, setTimeZone] = useState("");
  const [user, setUser] = useState("");
  const [profileImg, setProfileImg] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const allLanguages = ["English", "Urdu", "Arabic", "French", "Persian"];

  // check user online status Online OR Offline
  const userStatusCheckboxHandler = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    console.log(value, e.target.checked);
    if (checked && value) {
      setStatus((prevState) => [...prevState, value]);
    } else {
      let update = isStatus.filter((sub) => sub !== value);
      setStatus(update);
    }
  };

  // check user Subjects
  const userSubjectsCheckboxHandler = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    console.log("Language: ", value, checked);
    if (checked && value) {
      setSubjects((prevState) => [...prevState, value]);
    } else {
      let update = isSubjects.filter((lang) => lang !== value);
      setSubjects(update);
    }
  };

  // check user langugaes
  const userLanguagesCheckboxHandler = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    console.log(value, e.target.checked);
    if (checked && value) {
      setLanguages((prevState) => [...prevState, value]);
    } else {
      let update = isLanguages.filter((sub) => sub !== value);
      setLanguages(update);
    }
  };

  // check user gender
  const userGenderCheckboxHandler = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    console.log(value, e.target.checked);
    if (checked && value) {
      setGender((prevState) => [...prevState, value]);
    } else {
      let update = isGender.filter((sub) => sub !== value);
      setGender(update);
    }
  };

  // check user Country
  const userCountryHandler = (e) => {
    let value = e.target.value;
    console.log("Country: ", value);
    value && setCountry(value);
  };

  // check user timezone
  const userTimeZoneHandler = (e) => {
    let value = e.target.value;
    console.log("Country: ", value);
    value && setTimeZone(value);
  };

  const setUserName = async () => {
    const userInfo = await localStorage.getItem("userInfo");
    const name = JSON.parse(userInfo);
    console.log("User Info", name);

    setUser(name.username);
    setLogin(true);
  };

  const initialValues = {
    status: [],
    subjects: [],
    gender: [],
    langugaes: [],
    hourlyRate: [],
    country: "",
    timeZone: "",
  };

  const onSubmit = async () => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    let data = {
      status: isStatus,
      subjects: isSubjects,
      gender: isGender,
      languages: isLanguages,
      hourlyRate: isPriceRange,
      country: isCountry,
      timeZone: isTimeZone,
    };
    // Object.keys(data).forEach((key) => (data[key] == '') && delete data[key]); use if you want to remove the empty data
    console.log("filtered values:", data);

    try {
      let filteredResult = await axios.post("tutor/filter", data, {
        headers: {
          authorization: myToken,
        },
      });
      console.log("filtered result", filteredResult.data);
      filteredResult && setFilterContactList(filteredResult.data.data);
    } catch (error) {
      console.log("ERROR!");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const getAllTutors = async (user) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    setLoading(true);
    try {
      let tutors;
      if (user) {
        tutors = await axios.get(
          `contact/recommendation/?loginId=${user.loginId}&role=${user.userRole}`,
          {
            headers: {
              authorization: myToken,
            },
          }
        );
      } else {
        tutors = await axios.get("tutor/alltutors", {
          headers: {
            authorization: myToken,
          },
        });
      }
      console.log("All tutors", tutors.data.data);
      const allTutorsData = tutors.data.data;
      setAllTutor(allTutorsData);
      setFilterContactList(allTutorsData);
      const userImg = allTutorsData.map((item) => item.profileImage);
      setProfileImg(userImg);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.notify(
        "Request Timed out. Please check your internet connectivity"
      );
    }
  };

  const searchContact = (e) => {
    let searched = e.target.value;

    const filtered = isAllTutors.filter((contact) => {
      if (searched.length > 0) {
        let search = searched.split(" ");
        console.log("Search", search);
        if (search.length > 0 && search[1] && search[1] != "") {
          return (
            contact.firstName.toLowerCase().indexOf(search[0].toLowerCase()) !==
              -1 &&
            contact.lastName.toLowerCase().indexOf(search[1].toLowerCase()) !==
              -1
          );
        }
        return (
          contact.firstName
            .toLowerCase()
            .indexOf(searched.trim().toLowerCase()) !== -1 ||
          contact.lastName.toLowerCase().indexOf(searched.toLowerCase()) !==
            -1 ||
          contact.city.toLowerCase().indexOf(searched.toLowerCase()) !== -1 ||
          contact.country.toLowerCase().indexOf(searched.toLowerCase()) !== -1
        );
      }

      return isAllTutors;
    });
    setFilterContactList(filtered);
  };

  const sendInvite = async (invitedTo) => {
    const token = await localStorage.getItem("token");
    const myToken = JSON.parse(token);
    try {
      let data = {
        invitedTo,
        invitedBy: isUserInfo.loginId,
        role: isUserInfo.userRole,
        username: user,
      };
      console.log("invitedTo", data);
      const invitation = await axios.post("contact", data, {
        headers: {
          authorization: myToken,
        },
      });
      invitation && setLoading(false);
      console.log("Success", invitation);
      message.loading(`Please wait`).then(() => {
        message.success({
          content: `Invitation sent`,
          style: {
            zIndex: "999999",
            fontSize: "20px",
          },
        });
        setInvitedId(invitedTo);
        getAllTutors(isUserInfo);
      });
    } catch (error) {
      console.log(error);
      message.loading(`Please wait`).then(() => {
        message.warning({
          content: `Error while sending invitation`,
          style: {
            zIndex: "999999",
            fontSize: "20px",
          },
        });
      });
    }
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
      getAllTutors(res);
      if (isLogin == true) {
        setUserName();
      }
    });
  }, []);

  return (
    <>
      <section id="findstudent-page">
        <div className="container-fluid">
          {/*} {isLoading ? <LoaderUi /> : null} {*/}
          <div className="pagerow clearfix">
            <form onSubmit={formik.handleSubmit}>
              <div className="sidebar">
                {/* <h3>
                  Search by filters: &nbsp;&nbsp;{" "}
                  <button className="green-btn" type="submit">
                    Apply Filter
                  </button>
                </h3> */}
                <div>
                  <h3 style={{ alignItems: "center", display: "flex" }}>
                    Search by filters:
                    <button class="green-btn" type="submit">
                      Apply Filter
                    </button>
                  </h3>
                </div>
                <div className="searcfilter-box">
                  <h4>Status</h4>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="status"
                      value="online"
                      checked={isStatus.includes("online")}
                      onChange={userStatusCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Online</span>
                  </div>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="status"
                      value="offline"
                      checked={isStatus.includes("offline")}
                      onChange={userStatusCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Offline</span>
                  </div>
                </div>
                <div className="searcfilter-box">
                  <h4>Subjects</h4>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="subjects"
                      value="recitation"
                      checked={isSubjects.includes("recitation")}
                      onChange={userSubjectsCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Recitation</span>
                  </div>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="subjects"
                      value="arabic"
                      checked={isSubjects.includes("arabic")}
                      onChange={userSubjectsCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Arabic</span>
                  </div>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="subjects"
                      value="hifz"
                      checked={isSubjects.includes("hifz")}
                      onChange={userSubjectsCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Hifz</span>
                  </div>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="subjects"
                      value="tajweed"
                      checked={isSubjects.includes("tajweed")}
                      onChange={userSubjectsCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Tajweed</span>
                  </div>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="subjects"
                      value="Islamic Studies"
                      checked={isSubjects.includes("Islamic Studies")}
                      onChange={userSubjectsCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">
                      Islamic Studies
                    </span>
                  </div>
                </div>
                <div className="searcfilter-box">
                  <h4>Spoken Languages</h4>
                  {allLanguages.map((language, i) => (
                    <div className="checkbox-button">
                      <input
                        type="checkbox"
                        className="checkbox-button__input"
                        id="choice1-1"
                        name="languages"
                        value={language}
                        checked={isLanguages.includes(`${language}`)}
                        onChange={userLanguagesCheckboxHandler}
                      />
                      <span className="checkbox-button__control"></span>
                      <span className="checkbox-button__label">{language}</span>
                    </div>
                  ))}
                </div>
                <div className="searcfilter-box">
                  <h4>Gender</h4>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="gender"
                      value={"Male"}
                      checked={isGender.includes(`Male`)}
                      onChange={userGenderCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Male</span>
                  </div>
                  <div className="checkbox-button">
                    <input
                      type="checkbox"
                      className="checkbox-button__input"
                      id="choice1-1"
                      name="gender"
                      value={"Female"}
                      checked={isGender.includes(`Female`)}
                      onChange={userGenderCheckboxHandler}
                    />
                    <span className="checkbox-button__control"></span>
                    <span className="checkbox-button__label">Female</span>
                  </div>
                </div>
                <div className="searcfilter-box">
                  <h4>Hourly Rate</h4>
                  <div className="range-slider">
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      formatLabel={(value) => `${value} $`}
                      value={isPriceRange && isPriceRange}
                      onChange={(value) => setPriceRange(value)}
                    />
                  </div>
                </div>
                {/* Hide Rating filter */}
                {/* <div className="searcfilter-box" >
                                <h4>Ratings</h4>
                                <div className="checkbox-button">
                                    <input type="checkbox" className="checkbox-button__input" id="choice1-1" name="choice1" />
                                    <span className="checkbox-button__control"></span>
                                    <span className="checkbox-button__label">4.5 & Above</span>
                                </div>
                                <div className="checkbox-button">
                                    <input type="checkbox" className="checkbox-button__input" id="choice1-1" name="choice1" />
                                    <span className="checkbox-button__control"></span>
                                    <span className="checkbox-button__label">4.0 & Above</span>
                                </div>
                                <div className="checkbox-button">
                                    <input type="checkbox" className="checkbox-button__input" id="choice1-1" name="choice1" />
                                    <span className="checkbox-button__control"></span>
                                    <span className="checkbox-button__label">3.0 & Above</span>
                                </div>
                                <div className="checkbox-button">
                                    <input type="checkbox" className="checkbox-button__input" id="choice1-1" name="choice1" />
                                    <span className="checkbox-button__control"></span>
                                    <span className="checkbox-button__label">2.0 & Above</span>
                                </div>
                                <div className="checkbox-button">
                                    <input type="checkbox" className="checkbox-button__input" id="choice1-1" name="choice1" />
                                    <span className="checkbox-button__control"></span>
                                    <span className="checkbox-button__label">1.0 & Above</span>
                                </div>
                            </div>
                             */}
                <div className="searcfilter-box">
                  <h4>Country</h4>
                  <select onChange={userCountryHandler}>
                    <option value="default">Select country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="searcfilter-box">
                  <h4>Timezone</h4>
                  <select onChange={userTimeZoneHandler}>
                    <option value="default">Select timezone</option>
                    {timezone.map((tmz) => (
                      <option value={tmz.text}>{tmz.text}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            <div className="maincontent">
              <div className="searchsection">
                <span>
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search Contact"
                    onChange={searchContact}
                  />
                  {/* <button type="submit" className="default-btn">SEARCH</button> */}
                </span>
                <a href="#">How to find best Quran teacher?</a>
              </div>
              {isLoading === true ? (
                <div className="example">
                  <Spin size="large" />
                </div>
              ) : isFilterContactList ? (
                isFilterContactList.map(
                  (tutor, index) =>
                    tutor.firstName && (
                      <div
                        key={index}
                        className="sessionstab-content tutorfind"
                      >
                        <div className="reusedbox-content clearfix">
                          <div className="image-wrap">
                            <img
                              src={
                                profileImg.length >= 0 &&
                                profileImg[index] &&
                                profileImg[index][0]
                                  ? profileImg[index][0].profileImage
                                  : userImage
                              }
                              alt=""
                            />
                          </div>
                          <div className="boxcontent">
                            <h4>
                              {tutor.firstName ? tutor.firstName : "Tutor"}{" "}
                              {tutor.lastName}
                            </h4>
                            {/* <ul className="starrating">
                                                    <li className="fa fa-star checked"></li>
                                                    <li className="fa fa-star checked"></li>
                                                    <li className="fa fa-star checked"></li>
                                                    <li className="fa fa-star checked"></li>
                                                    <li className="fa fa-star checked"></li>
                                                </ul> */}
                            <span>Can Teach:</span>
                            {tutor.subjects.map((subject, index) => (
                              <em className="listItem" key={index}>
                                {subject}, &nbsp;
                              </em>
                            ))}
                            <br />
                            <p>* Assalamu Alikum. {tutor.about}</p>
                            <span>Spoken Languages:</span>
                            {tutor.languages.map((language, index) => (
                              <em className="listItem" key={index}>
                                {language}, &nbsp;
                              </em>
                            ))}
                            <br />
                            <span>Time Zone:</span>
                            <em>{tutor.timeZone}</em>
                            <br />
                            <span>Gender:</span>
                            <em>{tutor.gender}</em>
                            <br />
                            <span>Sect:</span>
                            <em>{tutor.sect}</em>
                            <br />
                            <span> City: </span>
                            <em> {tutor.city} </em> <br />
                            <div className="rate-section">
                              <ul>
                                <li>
                                  <em>Hourly Rate:</em>
                                  <span>${tutor.hourlyRate}/hr</span>
                                </li>
                                <li>
                                  <em>Sessions Conducted:</em>
                                  <span>{45 + index}</span>
                                </li>
                                <li>
                                  <em>Last Online:</em>
                                  <span>{index + 10} minutes ago</span>
                                </li>
                                <li>
                                  <em>Taught:</em>
                                  <span>{8 - index} Students</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="box-otherlinks">
                            <ul>
                              <li>
                                <a href="#" className="bluebox">
                                  <img src={messageIcon} alt="" />
                                </a>
                              </li>
                            </ul>
                            {isUserInfo && isUserInfo.userRole !== "tutor" && (
                              <a
                                className="green-btn green-btn-tutor"
                                onClick={() => sendInvite(tutor.userId)}
                              >
                                Send Invitation
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                )
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"Sorry no record found"}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindTutor;
