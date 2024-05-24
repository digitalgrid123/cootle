import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const Navbar = ({ disableGetStarted, onLogin, onsignup, disableLogin }) => {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className=" col-lg-10 offset-lg-2">
            <div className="navbar-cootle">
              <Link href="/" passHref className="cootle-container">
                <img src="/assets/images/mark/cootle.svg" alt="logo" />
                <h4 className="cootle-text">Cootle</h4>
              </Link>
              <div className="nav_cootle">
                <h2>Contact sales</h2>
                <button disabled={disableLogin} onClick={onLogin}>
                  <span>Log in</span>
                </button>

                <button disabled={disableGetStarted} onClick={onsignup}>
                  <span>Get started for free</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  disableGetStarted: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default Navbar;
