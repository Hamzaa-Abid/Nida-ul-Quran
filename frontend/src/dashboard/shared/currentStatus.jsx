import React from 'react';
import './style.css';

import activeIcon from '../../assets/images/active-icon.png';

const CurrentStatus = ({name}) => {

    return (
        <>
            <div className="welcomesection">
                <h2>Welcome To &nbsp;{name}&nbsp; Dashboard!</h2>
                <ul>
                    <li>
                        <dl id="sample" className="dropdown">
                            <dt><a href="#"><span><img className="alert-icon" src={activeIcon} alt="icon" /> Online </span> </a> </dt>
                            {/* <dd>
                                <ul>
                                    <li><a href="#"><img className="alert-icon" src="images/active-icon.png" alt="" > Online</a></li>
                                    <li><a href="#"><img className="alert-icon" src="images/offline-icon.png" alt="" > Offline</li>
                                </ul>
                            </dd>  */}
                        </dl>
                    </li>
                    {/* <li className="pref">
                        <a href="#"><i></i> <em>Preferences</em></a>
                    </li> */}
                </ul>
                <br/>
            </div>
        </>
    )
}

export default CurrentStatus
