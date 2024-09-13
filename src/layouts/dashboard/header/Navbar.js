import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({
  disableGetStarted,
  onLogin,
  onSignup,
  disableLogin,
  showContent,
  setShowContent,
}) => {
  const [hovered, setHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const [closing, setClosing] = useState(false);

  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // Handle body scroll based on overlay and content state
    if (showContent || showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on component unmount or when states change
    return () => {
      document.body.style.overflow = "";
    };
  }, [showContent, showOverlay]);

  const handleButtonClick = () => {
    setShowOverlay(true);
    setClosing(false);
  };

  const handleCloseOverlay = () => {
    setClosing(true);
    setTimeout(() => {
      setShowOverlay(false);
      setShowContent(false);
      setClosing(false);
    }, 500); // Match this duration with the CSS animation duration
  };

  const handleLoginClick = () => {
    if (isMobileScreen) {
      setShowContent(true);
      return;
    }
    if (onLogin) onLogin();
  };

  const handleGetStartedClick = () => {
    if (isMobileScreen) {
      setShowContent(true);
      return;
    }
    if (onSignup) onSignup();
  };

  const shouldShowLoginButton = () => {
    return isMobileScreen
      ? pathname === "/signup" || pathname === "/authentication"
      : true;
  };

  const shouldShowGetStartedButton = () => {
    return isMobileScreen ? pathname === "/login" : true;
  };
  const handleEmailClick = () => {
    window.open("mailto:sales@cootle.com", "_blank");
  };

  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-2">
            <div className="navbar-cootle">
              <Link href="/" passHref className="cootle-container">
                <img
                  src="/assets/images/mark/cootle.svg"
                  alt="logo"
                  title="Transforming ideas into elegant designs—where creativity meets functionality."
                />
                <h4 className="cootle-text m-0 weight-500">Cootle</h4>
              </Link>
              <div className="nav_cootle">
                <a
                  href="mailto:sales@cootle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="weight-500 hide-on-small-devices text-white"
                >
                  Contact sales
                </a>
                {shouldShowLoginButton() && (
                  <button disabled={disableLogin} onClick={handleLoginClick}>
                    <span className="weight-500">Log in</span>
                  </button>
                )}
                {shouldShowGetStartedButton() && (
                  <button
                    disabled={disableGetStarted}
                    onClick={handleGetStartedClick}
                  >
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
      {(showContent || showOverlay) && (
        <div className={`overlay ${closing ? "closing" : ""}`}>
          <div className="d-flex align-items-center justify-content-between pt-24 overlay-header">
            <div>
              <img
                src="/assets/images/mark/dark-logo.svg"
                alt="logo"
                loading="lazy"
                title="Transforming ideas into elegant designs—where creativity meets functionality."
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
          <div>
            {showContent ? (
              <div className="navigations-paragraphs">
                <p className="greet-text">Hey there! </p>
                <p className="notify-text">
                  Cootle isn't quite ready to shine on your mobile device just
                  yet, we're working hard on a mobile-friendly version that will
                  be here soon.
                </p>
                <p className="notify-text">
                  In the meantime, to get the full Cootle experience, we
                  recommend using a desktop or laptop browser
                </p>
                <p className="notify-text">
                  For any questions or feedback, feel free to shoot us an email
                  at support@cootle.com.{" "}
                </p>
                <p className="notify-text">We'd love to hear from you!</p>
                <p className="check-text">Thanks for checking on us.</p>
              </div>
            ) : (
              <div className="navigations-parameters">
                <button className="nav-button" onClick={handleLoginClick}>
                  <span>Log in</span>
                </button>
                <button className="nav-button" onClick={handleGetStartedClick}>
                  <span>Get Started</span>
                </button>
                <button className="contact-sales" onClick={handleEmailClick}>
                  <h2>Contact sales</h2>
                </button>
              </div>
            )}
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
