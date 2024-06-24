import React from 'react'
import './style.css'

const PlanAndPricing = () => {
    return (
        <>
            <section id="planpricing-page">
                <div className="container">
                    <h2>PLANS & PRICING</h2>
                    <p>These price plans are just registration fees. Tution fee is seperate for each plan.</p>
                    <div className="planpricing-wrap">
                        <div className="planpricing">
                            <div className="planpricing-head">
                                <h3>FREE</h3>
                            </div>
                            <div className="planpricing-body">
                                <ul>
                                    <li><i>30 Minutes Trial</i></li>
                                    <li><i>No Functions</i></li>
                                    <li><i>Upgrade Plan</i></li>
                                </ul>
                            </div>
                            <div className="planpricing-foot">
                                <a href="#">
                                    <h3>Upgrade Plan</h3>
                                </a>
                            </div>
                        </div>
                        <div className="planpricing">
                            <div className="planpricing-head">
                                <h3>BEGINNER/STARTER</h3>
                            </div>
                            <div className="planpricing-body">
                                <ul>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 7 Hours
                                            <input checked type="radio" name="radio8" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$10.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 11 Hours
                                            <input type="radio" name="radio29" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$14.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 15 Hours
                                            <input type="radio" name="radio30" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$17.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 20 Hours
                                            <input type="radio" name="radio3" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$21.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 25 Hours
                                            <input type="radio" name="radio4" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$25.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 30 Hours
                                            <input type="radio" name="radio5" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$29.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 40 Hours
                                            <input type="radio" name="radio6" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$37.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > Every Additional 5 Hours After
                                            <input type="radio" name="radio7" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$3.99</strong>
                                    </li>
                                    <li className="withoutinput">
                                        <span>*Tution Fee is Seperate</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="planpricing-foot">
                                <a href="#">
                                    <h3>Up Comming</h3>
                                </a>
                            </div>
                        </div>
                        <div className="planpricing">
                            <div className="planpricing-head">
                                <h3>ADVANCED</h3>
                            </div>
                            <div className="planpricing-body">
                                <ul>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 7 Hours
                                            <input type="radio" name="radio21" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$14.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 11 Hours
                                            <input checked type="radio" name="radio22" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$14.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 15 Hours
                                            <input type="radio" name="radio23" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$18.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 20 Hours
                                            <input type="radio" name="radio24" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$21.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 25 Hours
                                            <input type="radio" name="radio25" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$25.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 30 Hours
                                            <input type="radio" name="radio26" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$29.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 40 Hours
                                            <input type="radio" name="radio27" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$37.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > Every Additional 5 Hours After
                                            <input type="radio" name="radio28" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$5.99</strong>
                                    </li>
                                    <li className="withoutinput">
                                        <span>*Tution Fee is Seperate</span>
                                    </li>
                                    <li className="withoutinput checkbox-list">
                                        <span>Archives</span>
                                        <strong>
                                            <label className="plan-checkbox">
                                                <input type="checkbox" checked="checked" />
                                                <span className="radioBtn"></span>
                                            </label>
                                        </strong>
                                    </li>
                                </ul>
                            </div>
                            <div className="planpricing-foot">
                                <a href="#">
                                    <h3>Up Comming</h3>
                                </a>
                            </div>
                        </div>
                        <div className="planpricing">
                            <div className="planpricing-head">
                                <h3>PREMIUM</h3>
                            </div>
                            <div className="planpricing-body">
                                <ul>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 7 Hours
                                            <input type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$14.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 11 Hours
                                            <input type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$14.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 15 Hours
                                            <input type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$18.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 20 Hours
                                            <input type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$21.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 25 Hours
                                            <input type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$25.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 30 Hours
                                            <input checked type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$29.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > 40 Hours
                                            <input type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$37.99</strong>
                                    </li>
                                    <li>
                                        <span>
                                            <label className="plan-radio" > Every Additional 5 Hours After
                                            <input type="radio" name="radio2" />
                                                <em className="radioBtn"></em>
                                            </label>
                                        </span>
                                        <strong>$5.99</strong>
                                    </li>
                                    <li className="withoutinput">
                                        <span>*Tution Fee is Seperate</span>
                                    </li>
                                    <li className="withoutinput checkbox-list">
                                        <span>Archives</span>
                                        <strong>
                                            <label className="plan-checkbox">
                                                <input type="checkbox" checked="checked" />
                                                <span className="radioBtn"></span>
                                            </label>
                                        </strong>
                                    </li>
                                    <li className="withoutinput checkbox-list">
                                        <span>Parental Watch</span>
                                        <strong>
                                            <label className="plan-checkbox">
                                                <input type="checkbox" checked="checked" />
                                                <span className="radioBtn"></span>
                                            </label>
                                        </strong>
                                    </li>
                                </ul>
                            </div>
                            <div className="planpricing-foot">
                                <a href="#">
                                    <h3>Up Comming</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PlanAndPricing
