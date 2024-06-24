import React, { useState, useEffect, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import Main from "./landing/containers/main/Main";
import StudentDashboard from "./dashboard/student/containers/dashboard";
import TutorDashboard from "./dashboard/tutor/containers/dashboard";
import AdminDashboard from "./dashboard/admin/containers/dashboard";
import Forgot from "./ForgotPassword/Forgot";
import FourOfour from "./404";
import * as types from "./store/Actions/Types";
import { studentProfileAction, socketInitAction } from "./store/Actions";
import { establishConnection } from "./shared/Helpers/socket";
import AuthProvider, { useAuth } from "../src/Provider/AuthProvider";
import TeacherRoute from "../src/Routes/TeacherRoute";
import StudentRoute from "../src/Routes/StudentRoute";
function App() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");

  useEffect(() => {
    console.log("useRouteMatch", window.location.pathname);
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    if (userInfo && window.location.pathname !== "/home") {
      setRole(userInfo.userRole);
      let { profileImage, firstName, lastName } = userInfo;
      profileImage &&
        dispatch(studentProfileAction("UPDATE_PHOTO", profileImage));
      firstName &&
        dispatch(studentProfileAction(types.UPDATE_FNAME, firstName));
      lastName && dispatch(studentProfileAction(types.UPDATE_LNAME, lastName));
    }
    //  let socket = establishConnection(userInfo);
    //   socket && dispatch(socketInitAction(types.SOCKET_INIT, socket));
    //   console.log("socker initiated !!!", socket);
  }, []);
  //console.log("hello", useAuth());
  //console.log("Role", role);
  return (
    <AuthProvider value={role}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Main} />
          <StudentRoute path="/student">
            <StudentDashboard />
          </StudentRoute>

          <TeacherRoute path="/tutor">
            <TutorDashboard />
          </TeacherRoute>

          <Route path="/admin" component={AdminDashboard} />
          <Route path="//reset-password/" component={Forgot} />

          <Route component={FourOfour} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
