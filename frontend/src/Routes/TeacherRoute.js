import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import FourOfour from "../404";
import TutorDashboard from "../dashboard/tutor/containers/dashboard";
function TeacherRoute({ children, ...rest }) {
  let auth = useAuth();
  // return (
  //   <Route
  //     {...rest}
  //     render={({ location }) =>
  //       auth.userState == "tutor" ? children : <Route component={FourOfour} />
  //     }
  //   />
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.userState == "tutor" ? (
          children
        ) : auth.userState != "tutor" && auth.userState == "" ? (
          <Route component={TutorDashboard} />
        ) : (
          <Route component={FourOfour} />
        )
      }
    />
  );
}

export default TeacherRoute;
