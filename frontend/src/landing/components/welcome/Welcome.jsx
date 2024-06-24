import React, { useEffect, useState } from "react";
import "./welcome.css";
import adhan from "adhan";
import hijri from "hijri";

const Welcome = () => {
  const [isPrayerTimings, setPrayerTimings] = useState({});
  const location = async () => {
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const { latitude, longitude } = position.coords;
        prayersTiming(latitude, longitude);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const prayersTiming = async (latitude, longitude) => {
    try {
      const date = new Date();
      const coordinates = new adhan.Coordinates(latitude, longitude);
      const params = adhan.CalculationMethod.MuslimWorldLeague();
      params.madhab = adhan.Madhab.Hanafi;
      const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
      console.log(prayerTimes);
      const { fajr, dhuhr, asr, maghrib, isha, sunrise } = prayerTimes;

      const fajrTime = new Date(fajr).toLocaleTimeString();
      const dhuhrTime = new Date(dhuhr).toLocaleTimeString();
      const asrTime = new Date(asr).toLocaleTimeString();
      const maghribTime = new Date(maghrib).toLocaleTimeString();
      const ishaTime = new Date(isha).toLocaleTimeString();
      const sunriseTime = new Date(sunrise).toLocaleTimeString();

      const hijriDate = hijri.convert(date, 0);

      const { dayOfWeekText, monthText, year } = hijriDate;

      const prayersTimingObj = {
        fajr: fajrTime,
        dhuhr: dhuhrTime,
        asr: asrTime,
        maghrib: maghribTime,
        asr: asrTime,
        isha: ishaTime,
        sunrise: sunriseTime,
        date: date.toLocaleDateString(),
        hijri: `${dayOfWeekText}  ${monthText}  ${year}`,
      };

      setPrayerTimings(prayersTimingObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    location();
  }, []);

  return (
    <>
      <section id="welcome-wrap">
        <div className="container">
          <div className="welcomesection-content clearfix">
            <div className="welcomecontent">
              <h2>Welcome to Nida Ul Quran</h2>
              <h3>Enlightening the Hearts with Knowledge! </h3>
              <p>
                Nida Ul Quran is an online learning platform where you can learn
                Quran, Memorization (Hifz), Tajweed, Arabic, Islamic studies and
                much more. With the help of highly qualified tutors, you can
                deeply understand all type of subjects offered by this learning
                platform.
              </p>
              <p>
                Learn easily and efficiently in various languages from comfort
                of your home without having to download any software. You can
                track your progress and learn without any limitations.
              </p>

              <a href="/home/about-us" className="default-btn">
                Learn More
              </a>
            </div>
            <div className="welcome-prayertiming">
              <div className="timing-head">
                <h3>Today’s Prayer Times</h3>
              </div>
              <div className="dates-content">
                <p className="islamic-date">
                  Islamic:{" "}
                  <span style={{ fontSize: "20px" }}>
                    {isPrayerTimings.hijri}
                  </span>
                </p>
                <p>{isPrayerTimings.date}</p>
              </div>
              <div className="prayertimes">
                <ul>
                  <li>
                    <span>Fajr:</span>
                    <em>{isPrayerTimings.fajr}</em>
                  </li>
                  <li>
                    <span>Sunrise:</span>
                    <em>{isPrayerTimings.sunrise}</em>
                  </li>
                  <li>
                    <span>Dhuhr:</span>
                    <em>{isPrayerTimings.dhuhr}</em>
                  </li>
                  <li>
                    <span>Asr:</span>
                    <em>{isPrayerTimings.asr}</em>
                  </li>
                  <li>
                    <span>Maghrib:</span>
                    <em>{isPrayerTimings.maghrib}</em>
                  </li>
                  <li>
                    <span>Isha’a:</span>
                    <em>{isPrayerTimings.isha}</em>
                  </li>
                  <li>
                    <span>Jumu'ah:</span>
                    <em>{isPrayerTimings.dhuhr}</em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
