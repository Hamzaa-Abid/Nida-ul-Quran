import React, { useEffect, useState } from "react";
import axios from "../axios";
import {
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { message } from "antd";
import "./style.css";

export default function EmailVerify() {
  message.config({
    top: 10,
    rtl: true,
  });

  const history = useHistory();
  const location = useLocation();
  const params = useParams(location);
  let { path } = useRouteMatch();

  const [isParams, setParams] = useState({});
  const [isLoading, setLoading] = useState(false);

  const confirmVerification = async () => {
    try {
      setLoading(true);
      console.log(" im here ");
      const verify = await axios.get(
        `verifyemail/${params.role}/?id=${params.id}`
      );
      verify &&
        message.loading(`Verifying your Account!`).then(() => {
          message.success({
            content: `You can login now`,
            style: {
              zIndex: "999999",
              fontSize: "20px",
            },
          });
          history.push("/home");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setParams(params);
    console.log(params, "query location", location, "_ _ _", path);
  }, []);
  return (
    <div className="verify-wrapper">
      {isLoading ? (
        <p className="verifying">Updating your login status, Please wait</p>
      ) : (
        <>
          <p>Please verify your account, click below button</p>
          <button onClick={confirmVerification} className="verify-btn">
            Verify
          </button>
          <br />
          <br />
          <br />
          <p>
            After verification you will be automatically redirect to landing
            page.
          </p>
        </>
      )}
    </div>
  );
}
