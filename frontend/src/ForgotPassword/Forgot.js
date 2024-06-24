import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import "./style.css";
import queryString from "query-string";
import { Alert, message, Radio } from "antd";
const Forgot = (props) => {
  const [password, setPassword] = useState("");
  const [paramUser, setParamUser] = useState("");
  const [paramToken, setParamToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    const values = queryString.parse(props.location.search);

    setParamUser(values.user);
    setParamToken(values.token);
  }, []);
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const resetPassword = (event) => {
    if (password === "") {
      alert("Please provide your new password");
      return false;
    }
    event.preventDefault();
    let resetPasswordByLink = {
      newPassword: password,
      resetToken: paramToken,
    };
    console.log("password", resetPasswordByLink);
    if (paramUser == "student") {
      axiosInstance
        .post("/student/resetpassword", resetPasswordByLink)
        .then((res) => {
          console.log(res.data);
          message.loading(`Please wait`).then(() => {
            message.success({
              content: "Password has successfully changed!",
              style: {
                zIndex: "999999",
                fontSize: "20px",
              },
            });
            history.push("/");
          });
          
        })
        .catch((error) => {
          console.log(error);
          message.loading(`Please wait`).then(() => {
            message.success({
              content: "Error while changing the password",
              style: {
                zIndex: "999999",
                fontSize: "20px",
              },
            });
        });
      })
     
    } else if (paramUser == "tutor") {
      axiosInstance
        .post("/tutor/resetpassword", resetPasswordByLink)
        .then((res) => {
          console.log(res.data);
          message.loading(`Please wait`).then(() => {
            message.success({
              content: "Password has successfully changed!",
              style: {
                zIndex: "999999",
                fontSize: "20px",
              },
              
            });
            history.push("/");
          });
        
        })
        .catch((error) => {
          console.log(error);
          message.loading(`Please wait`).then(() => {
            message.warning({
              content: "Error while changing the password!",
              style: {
                zIndex: "999999",
                fontSize: "20px",
              },
            });
          });
        });
    }
  };

  return (
 
    <div className="transform">
    <div className="popupcontent">
      <div className="content-box">
        <div className="login-form">
          <form onSubmit={resetPassword}>
            <div className="form-control">
              <label htmlFor="Password">New Password</label>
              <input
                type="text"
                value={password}
                onChange={handleChange}
                placeholder="Enter password here"
              />
            </div>
            

            <input
              type="submit"
              value="Reset Password"
              className="default-btn"
            />
          </form>
        </div>
      </div>
    </div>
    </div>
   
  );
};
export default Forgot;
