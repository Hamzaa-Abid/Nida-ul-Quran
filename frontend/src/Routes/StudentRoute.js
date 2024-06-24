import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import FourOfour from "../404";
import StudentDashboard from "../dashboard/student/containers/dashboard";
function StudentRoute({ children, ...rest }) {
  let auth = useAuth();
  console.log(auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.userState == "student" ? (
          children
        ) : auth.userState != "student" && auth.userState == "" ? (
          <Route component={StudentDashboard} />
        ) : (
          <Route component={FourOfour} />
        )
      }
    />
  );
}

export default StudentRoute;
