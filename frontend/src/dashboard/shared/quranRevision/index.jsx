import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axios'
import './style.css'
import whiteBoard from '../../../assets/images/board.png';
import videoCall from '../../../assets/images/videocall.png';
import { BigWhiteboard } from 'react-component-whiteboard';
import LoaderUi from '../../../UiLoader/Loader';

const QuranRevision = () => {

  const [isLoading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState('30');
  const [Quran, setQuran] = useState('');
  const [Surah, setSurah] = useState(1);
  const [text, setText] = useState('quran-uthmani');
  const [SurahDetails, setSurahDetails] = useState([]);
  const [marginTop, setMarginTop] = useState('20')
  const [isVisible, setVisible] = useState(false);

  // This function use for navigation
  const QuranSurah = (surah) => {
    switch (surah) {
      case 'next':
        setSurah(prevState => (prevState < 114) ? prevState + 1 : 1)
        break;
      case 'prev':
        setSurah(prevState => (prevState > 1) ? prevState - 1 : 114)
        break;
      default:
        break;
    }
  }

  // For Quran Text Type
  const QuranText = (text) => {
    setText(text)
  }

  // Select Surah
  const QuranSelectedSurah = (surah) => {
    setSurah(surah)
  }

  // Set Font size
  const TextFontSize = (size) => {
    console.log(size)
    setFontSize(size)
  }

  const getQuran = async () => {
    setLoading(true);
    await axiosInstance.get(`https://api.alquran.cloud/v1/surah/${Surah}/${text}`).then(
      res => {
        console.log("QURAN", res.data.data)
        setQuran(res.data.data)
        setLoading(false);
      }
    )
  }

  const getSurah = async () => {
    setLoading(true);
    await axiosInstance.get(`https://api.alquran.cloud/v1/surah`).then(
      res => {
        console.log("QURAN SURAH DETAILS", res.data.data)
        setSurahDetails(res.data.data)
        setLoading(false);
      }
    )
  }

  const closeModal = () => {
    setVisible(!isVisible)
  }

  useEffect(() => {
    getSurah()
  }, [])


  useEffect(() => {
    getQuran()
  }, [Surah, text])


  useEffect(() => {
    window.onscroll = function () {
      window.pageYOffset < 120 ? 
        setMarginTop("20") : setMarginTop("-165.5")
    };
    return () => {
      window.onscroll = null;
    };
  }, [])


  return (
    <>
      {isLoading && <LoaderUi />}
      <div className="quranrevision-page">
        {/* <div className="next nav-btn" onClick={() => QuranSurah('prev')}></div>
            <div className="previous nav-btn" onClick={() => QuranSurah('next')}></div> */}
        <div className="quranrevision-row clearfix">
          <div dir={Quran && Quran.edition.direction} className="quranrevision-slider" >
            <div className="Quran-surah-name">
              {Quran && Quran.name}
            </div>
            {Quran.number !== 1 && Quran.number !== 9 &&
              <div className="Bismillah" style={{ fontSize: fontSize + 'px' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>}
            {
              Quran && Quran.ayahs.map((ayah, i) => {
                return (
                  <span className="ayah"
                    style={{ fontSize: fontSize + 'px' }}>
                    {Quran.number !== 1 && i === 0 ?
                      ayah.text
                        .replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "")
                        .replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "")
                        .replace("بسم الله الرحمن الرحيم", "")
                        .replace("بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ", "")
                      : ayah.text}
                    &nbsp;<b className="ayah-number">{i + 1}</b> &nbsp;
                  </span>
                )
              })
            }
          </div>
          <div className="quranrevision-setting" style={{ marginTop: marginTop + 'px' }}>
            <div className="quransetting-box">
              <label>Surah:</label>
              <select onChange={(e) => QuranSelectedSurah(e.target.value)}>
                {
                  SurahDetails.map(surah => {
                    return (
                      <option key={surah.number} value={surah.number}>{surah.number} &nbsp; {surah.englishName} &nbsp;&nbsp;&nbsp; {surah.name}</option>
                    )
                  })
                }
              </select>
              <label>Text:</label>
              <select onChange={(e) => QuranText(e.target.value)}>
                <option value="quran-uthmani">Uthmani</option>
                <option value="quran-simple-clean">Simple</option>
                <option calue="quran-simple-enhanced">Simple enhanced</option>
                <option value="en.sahih">English</option>
                <option value="ur.maududi">Urdu</option>
              </select>
            </div>
            <div className="quransetting-box">
              <label>Font:</label>
              <select onChange={(e) => TextFontSize(e.target.value)}>
                <option value="30">Default</option>
                <option value="60">Large</option>
                <option value="45">Medium</option>
                <option value="20">Small</option>
                <option value="50">50</option>
                <option value="55">55</option>
                <option value="65">65</option>
                <option value="70">70</option>
              </select>
            </div>
            <div className="quransetting-box">
              <div className="whiteboard" onClick={closeModal}>
                <img src={whiteBoard} width="30" height="30" /> &nbsp; &nbsp;
                <span>Click for Whiteboard </span></div>
            </div>
          </div>
        </div>
      </div>

      {isVisible &&
        <div className="white-board-mpdal" >
          <div className="closeBtn" onClick={closeModal}><span>Close</span></div>
          <div className="white-board-wrapper">
            <BigWhiteboard />
          </div>
        </div>
      }
    </>
  )
}

export default QuranRevision
