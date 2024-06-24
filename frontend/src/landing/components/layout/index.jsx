import React from 'react';

import Header from '../header/Header'
import Footer from '../footer/Footer'

const LandingLayout = ({children, loginClick, signUpClick}) => {
  return (
    <>
      <Header loginClick={loginClick} signUpClick={signUpClick}/>
      <>
        {children}
      </>
      <Footer />
    </>
  )
}

export default LandingLayout
