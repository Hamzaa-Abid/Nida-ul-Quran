import React, { useEffect, useState } from "react";
import "./style.css";
import { useFormik } from "formik";
import { message, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { studentProfileAction } from "../../../store/Actions";
import * as types from "../../../store/Actions/Types";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../../axios";
import LoaderUi from "../../../UiLoader/Loader";
import { countries } from "../../../shared/countriesData/CountriesData";
import { timezone } from "../../../shared/timeZoneData/TimeZone";

const StudentProfile = () => {
  const photo =
    "https://emeraldpsychiatry.com/wp-content/uploads/2018/05/dummy_players.png";
  const dispatch = useDispatch();
  let userProfilePhoto = useSelector(
    (state) => state.studentProfileReducer.photo
  );

  const [isUserId, setUserID] = useState(null);
  const [isUserRole, setUserRole] = useState("");
  const [isUserName, setUserName] = useState("");
  const [isProfileId, setProfileId] = useState(null);
  const [isProfileImageId, setProfileImageId] = useState(false);
  const [isPasswordChnageModal, setPasswordChnageModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCountry, setCountry] = useState(null);
  const [isTimeZone, setIsTimeZone] = useState(null);
  const [islanguages, setlanguages] = useState([
    "English",
    "Urdu",
    "Arabic",
    "Persian",
    "French",
  ]);
  const [isUpdatelanguages, setUpdatelanguages] = useState([]);
  const [isFiqah, setFiqah] = useState("");
  const [isSect, setSect] = useState("");
  const [isSubjects, setSubjects] = useState([]);
  const [userProfileData, setUserProfileData] = useState("");

  const [isUserProfileInfo, setUserProfileInfo] = useState({});
  const [isUserEmail, setUserEmail] = useState("");

  const { Option } = Select;

  const subjectsCheckboxHandler = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    if (checked && value) {
      setSubjects((prevState) => [...prevState, value]);
    } else {
      let update = isSubjects.filter((sub) => sub !== value);
      setSubjects(update);
    }
  };

  const languagesChangeHandler = (value) => {
    setUpdatelanguages(value);
    formik.values.languages = value;
  };
  const countryChangeHandler = (value) => {
    setCountry(value);
    formik.values.country = value;
  };
  const timeZoneChangeHandler = (value) => {
    setIsTimeZone(value);
    formik.values.timeZone = value;
  };
  const passwordChangeModalHandler = () => {
    setPasswordChnageModal(!isPasswordChnageModal);
  };
  const fiqahChangeHandler = (value) => {
    console.log(value.target.value);
    const fiqah = value.target.value;
    setFiqah(fiqah);
    formik.values.fiqh = fiqah;
  };
  const sectChangeHandler = (value) => {
    console.log(value.target.value);
    const sect = value.target.value;
    setSect(sect);
    formik.values.sect = sect;
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    cellNumber: "",
    country: "",
    province: "",
    languages: [],
    timeZone: "",
    city: "",
    subjects: [],
    profileImage: "",
    about: "",
    userId: "",
    // address: "",
    hourlyRate: 0,
    fiqh: "",
    sect: "",
  };

  // form on submit handler
  const onSubmit = async (values) => {
    let token = localStorage.getItem("token");
    let myToken = JSON.parse(token);
    setLoading(true);
    Object.keys(values).forEach(
      (key) => values[key] == "" && delete values[key]
    );
    const studentData = {
      ...values,
      userId: isUserId,
      subjects: isSubjects,
    };
    console.log("_____", studentData);
    if (isProfileId) {
      try {
        const userProfileUpdate = await axiosInstance.put(
          `${isUserRole}/profile/${isUserId}`,
          studentData
        );
        if (userProfileUpdate.status === 200) {
          const userInfo = userProfileUpdate.data.data;
          console.log("----------porfile PUT", userInfo);
          const { firstName, lastName } = userInfo.profile;
          firstName &&
            dispatch(studentProfileAction("UPDATE_FNAME", firstName));
          lastName && dispatch(studentProfileAction("UPDATE_LNAME", lastName));
          let userStoredInfo = localStorage.getItem("userInfo");
          userStoredInfo = JSON.parse(userStoredInfo);
          userStoredInfo = { ...userStoredInfo, firstName, lastName };
          localStorage.setItem("userInfo", JSON.stringify(userStoredInfo));
          message.loading("Updating your profile...").then(() => {
            message.success("Your Profile has been updated successfully ");
            setLoading(false);
          });
        }
      } catch (error) {
        message.error("something went wrong");
        setLoading(false);
      }
    } else {
      try {
        const userProfileUpdate = await axiosInstance.post(
          `student/profile`,
          studentData,
          {
            headers: {
              authorization: myToken,
            },
          }
        );
        if (userProfileUpdate.status === 200) {
          const userInfo = userProfileUpdate.data.data;
          console.log(userInfo);
          message.loading("Updating your profile...").then(() => {
            message.success("Your Profile has been updated successfully ");
            setLoading(false);
          });
        }
      } catch (error) {
        message.error("something went wrong" + error.message);
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  let studentChangePassword = {
    password: "",
    newPassword: "",
  };

  const studentChangePassword_OnSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      resetForm({});
      const userProfileUpdate = await axiosInstance.put(
        `${isUserRole}/changepassword/${isUserId}`,
        values
      );
      if (userProfileUpdate.status === 200) {
        message.loading("Updating your Password").then(() => {
          message.success("Your password updated successfully ");
          setLoading(false);
          setPasswordChnageModal(false);
        });
      }
    } catch (error) {
      message.error("something went wrong");
      setLoading(false);
    }
  };

  const studentChangePasswordFormik = useFormik({
    initialValues: studentChangePassword,
    onSubmit: studentChangePassword_OnSubmit,
  });

  const updateProfilePhoto = async (e) => {
    let file = e.target.files[0];
    const photo = window.URL.createObjectURL(file);
    dispatch(studentProfileAction(types.UPDATE_PHOTO, photo));
    let formData = new FormData();
    formData.append("profileImage", file, file.name);
    formData.append("userRole", isUserRole);
    formData.append("userId", isUserId);

    console.log(" userProfileID ", isProfileId);
    console.log(" isProfileImageId ", isProfileImageId, isProfileImageId);
    if (isProfileImageId) {
      try {
        const userProfileUpdate = await axiosInstance({
          method: "put",
          url: `user/profile/image/${isUserId}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(">>>> ", userProfileUpdate);
        if (userProfileUpdate.status === 200) {
          const { profileImage } = userProfileUpdate.data.data[0];
          dispatch(studentProfileAction("UPDATE_PHOTO", profileImage));
          let userStoredInfo = localStorage.getItem("userInfo");
          userStoredInfo = JSON.parse(userStoredInfo);
          userStoredInfo = { ...userStoredInfo, profileImage };
          localStorage.setItem("userInfo", JSON.stringify(userStoredInfo));
          message.loading("Uploading your profile photo...").then(() => {
            message.success(
              "Your profile photo has been uploaded successfully"
            );
          });
        }
      } catch (error) {
        console.log("UPDATE PHOTO ERROR", error.message);
      }
    } else {
      try {
        const userProfileUpdate = await axiosInstance({
          method: "post",
          url: `user/profile/image`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(">>>> ", userProfileUpdate);
        // return
        if (userProfileUpdate.status === 200) {
          // const { userId } = userProfileUpdate.data.data.studentProfile[0];
          // dispatch(studentProfileAction('UPDATE_ID', userId))
          const profileImage = userProfileUpdate.data.data.profileImage;
          dispatch(studentProfileAction("UPDATE_PHOTO", profileImage));
          let userStoredInfo = localStorage.getItem("userInfo");
          userStoredInfo = JSON.parse(userStoredInfo);
          userStoredInfo = { ...userStoredInfo, profileImage };
          localStorage.setItem("userInfo", JSON.stringify(userStoredInfo));
          message.loading("Uploading your profile photo...").then(() => {
            message.success(
              "Your profile photo has been uploaded successfully"
            );
          });
        }
      } catch (error) {
        message.error("something went wrong!");
        console.log("UPDATE PHOTO ERROR", error.message);
      }
    }
  };

  const getUserProfile = async () => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    console.log(userInfo);
    setUserRole(userInfo.userRole);
    setUserID(userInfo.loginId);
    setUserEmail(userInfo.email);
    setUserName(userInfo.username);
    try {
      const userProfile = await axiosInstance.get(
        `${userInfo.userRole}/profile/${userInfo.loginId}` // rememmber to store in local storage when login
      );

      console.log("userProfile api HERE!!!!");
      console.log("userProfile api", userProfile);
      const profileImage = userProfile.data.data.image.profileImage;
      console.log("profile IMAGE ", profileImage);
      const profileData = userProfile.data.data.profile;
      console.log("profileData", profileData);
      setProfileId(profileData._id); // get profile ID
      setUserProfileInfo(profileData);
      setUpdatelanguages(profileData.languages);
      setSubjects(profileData.subjects);
      setFiqah(profileData.fiqh);
      setSect(profileData.sect);

      //setUserProfileInfo({country : "berlin", city:"america"}) // if st
      profileImage &&
        dispatch(studentProfileAction(types.UPDATE_PHOTO, profileImage));
    } catch (error) {
      console.log("GET PROFILE ERROR", error);
      setProfileId(null);
    }
    /* setUserProfileInfo({firstName : "l",
          about :"asasd"}) // if st*/
  };

  const getUserProfileImage = async () => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    console.log(userInfo);
    setUserID(userInfo.loginId);

    try {
      const userProfileImage = await axiosInstance.get(
        `user/profile/image/${userInfo.loginId}` // rememmber to store in local storage when login
      );
      console.log("userProfile IMAGE HERE!!!!", userProfileImage);
      if (userProfileImage) {
        const profileImage = userProfileImage.data.data[0].profileImage;
        profileImage &&
          dispatch(studentProfileAction(types.UPDATE_PHOTO, profileImage));
        setProfileImageId(true);
      }
    } catch (error) {
      console.log("GET PROFILE IMAGE ERROR", error);
      setProfileImageId(null);
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserProfileImage();
  }, []);

  return (
    <>
      {isLoading && <LoaderUi />}
      <section id="main-content">
        <div className="container-fluid">
          <div className="edit-page">
            <div className="__topbar-header">
              <h3>Edit Profile</h3>
              <a onClick={passwordChangeModalHandler} id="password-btn">
                Change Password
              </a>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="editpage-topcontent clearfix">
                <div className="edittop-left">
                  <div className="white-box">
                    <label>Profile Picture</label>
                    <div className="profilepicture-wrap">
                      <div className="row">
                        <div className="small-12 medium-2 large-2 columns">
                          <div className="circle">
                            <img
                              className="profile-pic"
                              src={userProfilePhoto || photo}
                              alt="image"
                            />
                          </div>
                          <p>
                            <b>{isUserName}</b>
                          </p>
                          <div className="p-image">
                            <input
                              className="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) => updateProfilePhoto(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="edittop-right">
                  <div className="white-box">
                    <div className="edit-row">
                      <label>About</label>
                      <textarea
                        rows="3"
                        cols="8"
                        name="about"
                        defaultValue={
                          isUserProfileInfo.about || formik.values.about
                        }
                        onChange={formik.handleChange}
                      ></textarea>
                    </div>
                    <div className="edit-row clearfix">
                      <div className="editcol-left">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          defaultValue={
                            isUserProfileInfo.firstName ||
                            formik.values.firstName
                          }
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="editcol-right">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          defaultValue={
                            isUserProfileInfo.lastName || formik.values.lastName
                          }
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="edit-row clearfix">
                      <div className="editcol-left">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          defaultValue={
                            formik.values.dob || isUserProfileInfo.dob
                          }
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="editcol-right">
                        <label>Gender</label>
                        <select
                          name="gender"
                          value={
                            formik.values.gender || isUserProfileInfo.gender
                          }
                          onChange={formik.handleChange}
                        >
                          <option label="Select Gender"></option>
                          <option value="Male" label="Male">
                            Male
                          </option>
                          <option value="Female" label="Female">
                            Female
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="white-box text-right">
                <div className="edit-row clearfix">
                  <div className="editcol-left">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={isUserEmail}
                      readOnly
                    />
                  </div>
                  <div className="editcol-right">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="cellNumber"
                      defaultValue={
                        isUserProfileInfo.cellNumber || formik.values.cellNumber
                      }
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="white-box">
                {/* <div className="edit-row">
                                    <label>Address</label>
                                    <input type="text" name="address" defaultValue={userProfileData.address} onChange={formik.handleChange} />
                                    </div> */}
                <div className="edit-row clearfix">
                  <div className="editcol-left">
                    <label>Country</label>
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                        backgroundColor: "#edf0f8 !important",
                      }}
                      name="country"
                      placeholder="Please select country"
                      value={isCountry || isUserProfileInfo.country}
                      onChange={countryChangeHandler}
                    >
                      {countries.map((country) => (
                        <Option key={country.name}>{country.name}</Option>
                      ))}
                    </Select>
                  </div>
                  <div className="editcol-right">
                    <label>Timezone</label>
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                        backgroundColor: "#edf0f8 !important",
                      }}
                      name="timezone"
                      placeholder="Please select timezone"
                      value={isTimeZone || isUserProfileInfo.timeZone}
                      onChange={timeZoneChangeHandler}
                    >
                      {timezone.map((tmz) => (
                        <Option key={tmz.text}>{tmz.text}</Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="edit-row clearfix">
                  <div className="editcol-left">
                    <label>State/Province</label>
                    <input
                      type="text"
                      name="province"
                      defaultValue={
                        isUserProfileInfo.province || formik.values.province
                      }
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="editcol-right">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      defaultValue={
                        isUserProfileInfo.city || formik.values.city
                      }
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="edit-row clearfix">
                  <div className="editcol-left">
                    <label>Languages</label>
                    <Select
                      mode="multiple"
                      style={{ width: "100%", backgroundColor: "#edf0f8" }}
                      name="languages"
                      placeholder="Please select"
                      value={isUpdatelanguages || formik.values.languages}
                      onChange={languagesChangeHandler}
                    >
                      {islanguages.map((lang) => (
                        <Option key={lang}>{lang}</Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="white-box">
                <label>Subjects</label>
                <div className="checkbox-button">
                  <input
                    type="checkbox"
                    className="checkbox-button__input"
                    id="choice1-1"
                    value="recitation"
                    name="subjects"
                    checked={isSubjects.includes("recitation")}
                    onChange={subjectsCheckboxHandler}
                  />
                  <span className="checkbox-button__control"></span>
                  <span className="checkbox-button__label">Recitation</span>
                </div>
                <div className="checkbox-button">
                  <input
                    type="checkbox"
                    className="checkbox-button__input"
                    id="choice1-2"
                    value={"tajweed"}
                    name="subjects"
                    checked={isSubjects.includes("tajweed")}
                    onChange={subjectsCheckboxHandler}
                  />
                  <span className="checkbox-button__control"></span>
                  <span className="checkbox-button__label">Tajweed</span>
                </div>

                <div className="checkbox-button">
                  <input
                    type="checkbox"
                    className="checkbox-button__input"
                    id="choice1-3"
                    value={"hifz"}
                    name="subjects"
                    checked={isSubjects.includes("hifz")}
                    onChange={subjectsCheckboxHandler}
                  />
                  <span className="checkbox-button__control"></span>
                  <span className="checkbox-button__label">Hifz</span>
                </div>
                <div className="checkbox-button">
                  <input
                    type="checkbox"
                    className="checkbox-button__input"
                    id="choice1-4"
                    value={"arabic"}
                    name="subjects"
                    checked={isSubjects.includes("arabic")}
                    onChange={subjectsCheckboxHandler}
                  />
                  <span className="checkbox-button__control"></span>
                  <span className="checkbox-button__label">Arabic</span>
                </div>
                <div className="checkbox-button">
                  <input
                    type="checkbox"
                    className="checkbox-button__input"
                    id="choice1-4"
                    value={"Islamic Studies"}
                    name="subjects"
                    checked={isSubjects.includes("Islamic Studies")}
                    onChange={subjectsCheckboxHandler}
                  />
                  <span className="checkbox-button__control"></span>
                  <span className="checkbox-button__label">Islamic Studies</span>
                </div>
                <br />
                <br />
                <br />
                {isUserRole === "tutor" && (
                  <>
                    <div class="edit-row three-col clearfix">
                      <div class="editcol-left">
                        <label>Hourly Rate (Dollars)</label>
                        <input
                          name="hourlyRate"
                          type="number"
                          defaultValue={isUserProfileInfo.hourlyRate}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div class="editcol-left">
                        <label>Fiqh</label>
                        <select
                          name="fiqah"
                          value={isFiqah || formik.values.fiqah}
                          onChange={fiqahChangeHandler}
                        >
                          <option>Hanafi</option>
                          <option>Shafi</option>
                          <option>Deobandi</option>
                          <option>Beralvi</option>
                          <option>Malki</option>
                          <option>Jafri</option>
                          <option>Zaidiyyah</option>
                        </select>
                      </div>
                      <div class="editcol-left">
                        <label>Sect</label>
                        <select
                          name="sect"
                          value={isSect || formik.values.sect}
                          onChange={sectChangeHandler}
                        >
                          <option>Sunni</option>
                          <option>Shiah</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* onClick={() => updateProfile()} */}
              <button type="submit" className="green-btn">
                Save
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* update password modal */}
      {isPasswordChnageModal && (
        <>
          <div className="modal-window"></div>
          <div className="window-wrapper">
            <a
              onClick={() => setPasswordChnageModal(false)}
              title="Close"
              className="modal-close"
            >
              Close
            </a>
            <div className="modalhead">
              <h2>Change Password</h2>
            </div>
            <div className="modalbody">
              <p>
                Update your password frequently if you find any suspicious
                login!
              </p>
              <form onSubmit={studentChangePasswordFormik.handleSubmit}>
                <div className="inputwrap old">
                  <span></span>
                  <input
                    type="password"
                    placeholder="Old Password"
                    name="password"
                    defaultValue={
                      studentChangePasswordFormik.values.password ||
                      userProfileData.password
                    }
                    onChange={studentChangePasswordFormik.handleChange}
                  />
                </div>
                <div className="inputwrap">
                  <span></span>
                  <input
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                    defaultValue={
                      studentChangePasswordFormik.values.newPassword ||
                      userProfileData.newPassword
                    }
                    onChange={studentChangePasswordFormik.handleChange}
                  />
                </div>
                <div className="inputwrap">
                  <span></span>
                  <input
                    type="password"
                    placeholder="Re-enter Your New Password"
                    name="newConfirmPassword"
                    defaultValue={
                      studentChangePasswordFormik.values.newConfirmPassword ||
                      userProfileData.newConfirmPassword
                    }
                    onChange={studentChangePasswordFormik.handleChange}
                  />
                </div>
                {isLoading ? (
                  <button type="submit" className="green-btn" disabled>
                    Updating your password...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="green-btn"
                    disabled={
                      studentChangePasswordFormik.values.newPassword !==
                      studentChangePasswordFormik.values.newConfirmPassword
                    }
                  >
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentProfile;
