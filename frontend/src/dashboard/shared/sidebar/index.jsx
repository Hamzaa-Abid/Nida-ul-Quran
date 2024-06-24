import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.css';

import {
    NavLink,
    useRouteMatch,
    useHistory
} from "react-router-dom";

import footerIcon from '../../../assets/images/sidebar-foot.png';
import {LogoutOutlined} from '@ant-design/icons';

const SideBar = (props) => {
    let { url } = useRouteMatch();
    let history = useHistory();
    const [isCollapse, setCollapse] = useState(false);
    const [isUserRole, setUserRole] = useState('');

    let user = useSelector((state) => state.studentProfileReducer);
    const toggleMenu = () => {
        props.toggleMenu();
        setCollapse(!isCollapse)
    }

    const logoutHandler = () => {
        localStorage.clear();
        history.push('/');
    }

    const getUserInfo = async () => {
        const info = await localStorage.getItem('userInfo');
        console.log('_INFO_', JSON.parse(info).userRole);
        const role = JSON.parse(info).userRole;  
        setUserRole(role);
    }

    useEffect(() => {
        getUserInfo();
    }, []);


    return (
        <>
            <div className="sidebar-menu" className={(isCollapse) ? "sidebar-menu closesidebar" : "sidebar-menu"}>
                <div className="overflow">
                    <div className="user-avatar">
                        <div className="avatar">
                            <img src={user.photo} alt="avatar" />
                        </div>
                        <h6>{user.firstName} &nbsp; {user.lastName}</h6>
                    </div>
                    <div className="actionbtn" onClick={() => toggleMenu()}>
                        <a></a>
                    </div>
                    <menu id="nav">
                        <ul>
                            <li className="dashboard">
                                <NavLink title="Dashboard" to={`${url}`} exact activeClassName="active dashboard" >
                                    <i></i> 
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            {/* <li className="archive"><NavLink title="Archive" to={`${url}/archive`} exact activeClassName="active archive" ><i></i> <span>Archive</span></NavLink></li> */}
                            {/* { (isUserRole === 'student') && <li className="parental"><NavLink title="Parental Watch" to={`${url}/parental-watch`} exact activeClassName="active parental" ><i></i> <span>Parental Watch</span></NavLink></li> } */}
                            <li className="quran"><NavLink title="Quran Revision" to={`${url}/revision`} exact activeClassName="active quran" ><i></i> <span>Quran Revision</span></NavLink></li>
                            <li className="availability"><NavLink title="Availability" to={`${url}/availability`} exact activeClassName="active availability" ><i></i> <span>Availability</span></NavLink></li>
                            <li className="messages"><NavLink title="Messages" to={`${url}/chat`} exact activeClassName="active messages" ><i></i> <span>Messages</span></NavLink></li>
                            <li className="edit"><NavLink title="Edit Profile" to={`${url}/profile`} exact activeClassName="active edit" ><i></i> <span>Edit Profile</span></NavLink></li>
                            <li className="logout" onClick={logoutHandler}> <p> Logout</p></li>
                        </ul>
                    </menu>
                    <div className="helpsupport">
                        <a title="Need Help & Support?">
                            <div className="helpsupprt-img">
                                <img src={footerIcon} alt="" />
                            </div>
                            <h6>Need HElp & SUPPORT?</h6>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
