import React from 'react'
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Layout from '../../../shared/layout';
import StudentProfile from '../../../shared/profile'
import Archive from '../../components/archive';
import ParentalWatch from '../../components/parentalWatch';
import FourOfour from '../../../../404';
import Landing from '../../components/Landing/Landing';
import QuranRevision from '../../../shared/quranRevision';
import Scheduler from '../../../student/components/scheduler/Scheduler';
import Chat from '../../../shared/chat';

const StudentDashboard = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Layout>
        <div className="dashboardWrapper">
          <Switch>
            <Route exact path={`${path}`} component={Landing} />
            <Route exact path={`${path}/student`} component={FourOfour} />
            <Route exact path={`${path}/profile`} component={StudentProfile} />
            <Route exact path={`${path}/archive`} component={FourOfour} />
            <Route exact path={`${path}/chat`} component={Chat} />
            <Route exact path={`${path}/revision`} component={QuranRevision} />
            <Route exact path={`${path}/parental-watch`} component={FourOfour} />
            <Route exact path={`${path}/availability`} component={Scheduler} />
            <Route component={FourOfour} />
          </Switch>
        </div>
      </Layout>
    </>
  )
}

export default StudentDashboard
