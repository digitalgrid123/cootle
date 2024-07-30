import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ disableGetStarted, onLogin, onSignup, disableLogin }) => {
  const [hovered, setHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isIphoneOrIpad, setIsIphoneOrIpad] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsIphoneOrIpad(/iPhone|iPad/i.test(navigator.userAgent));
  }, []);

  const handleButtonClick = () => {
    setShowOverlay(true);
    setClosing(false);
  };

  const handleCloseOverlay = () => {
    setClosing(true);
    setTimeout(() => {
      setShowOverlay(false);
      setClosing(false);
    }, 500); // Match this duration with the CSS animation duration
  };

  const shouldShowLoginButton = () => {
    if (isIphoneOrIpad) {
      return pathname === "/signup" || pathname === "/authentication";
    }
    return true;
  };

  const shouldShowGetStartedButton = () => {
    if (isIphoneOrIpad) {
      return pathname === "/login";
    }
    return true;
  };

  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-2">
            <div className="navbar-cootle">
              <Link href="/" passHref className="cootle-container">
                <img src="/assets/images/mark/cootle.svg" alt="logo" />
                <h4 className="cootle-text m-0 weight-500">Cootle</h4>
              </Link>
              <div className="nav_cootle">
                <h2 className="weight-500 hide-on-small-devices ">
                  Contact sales
                </h2>
                {shouldShowLoginButton() && (
                  <button disabled={disableLogin} onClick={onLogin}>
                    <span className="weight-500">Log in</span>
                  </button>
                )}
                {shouldShowGetStartedButton() && (
                  <button disabled={disableGetStarted} onClick={onSignup}>
                    <span className="weight-500">Get started for free</span>
                  </button>
                )}
                <button
                  className="outline-btn"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={handleButtonClick}
                >
                  <img
                    src={
                      hovered
                        ? "/assets/images/mark/filled.svg"
                        : "/assets/images/mark/outline.svg"
                    }
                    alt="outline-icon"
                    loading="lazy"
                    className="hover-image"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOverlay && (
        <div className={`overlay ${closing ? "closing" : ""}`}>
          <div className="d-flex align-items-center justify-content-between pt-24 overlay-header">
            <div>
              <img
                src="/assets/images/mark/dark-logo.svg"
                alt="logo"
                loading="lazy"
              />
            </div>
            <button onClick={handleCloseOverlay} className="close-mobile-btn">
              <img
                src="/assets/images/mark/close-icon-btn.svg"
                alt="close-icon-btn"
                loading="lazy"
              />
            </button>
          </div>
          <div className="navigations-parameters">
            <button className="nav-button" onClick={onLogin}>
              <span>Log in</span>
            </button>
            <button className="nav-button" onClick={onSignup}>
              <span>Get Started</span>
            </button>
            <button className="contact-sales">
              <h2>Contact sales</h2>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

Navbar.propTypes = {
  disableGetStarted: PropTypes.bool.isRequired,
  onLogin: PropTypes.func,
  onSignup: PropTypes.func.isRequired,
  disableLogin: PropTypes.bool,
};

export default Navbar;
