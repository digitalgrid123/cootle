import React from "react";

const InvitationModel = ({
  showPopup,
  next,
  contentRef,
  handleClickOutside,
}) => {
  const nextbox = () => {
    next();
  };

  return (
    <div>
      {showPopup && (
        <div className="invitation-overlay" onClick={handleClickOutside}>
          <div ref={contentRef} className="invitation-content">
            <div className="box-container center">
              <div>
                <h1 className="invitation-heading">Join a Company</h1>
                <div className="invitation-detail">
                  <p className="invite-content">Currently no company invites</p>
                </div>
              </div>
              <div className="line"></div>
              <div>
                <h1 className="invitation-heading">Create Your Own</h1>
                <div className="company-detail" onClick={nextbox}>
                  <div className="center" style={{ gap: "14px" }}>
                    <img
                      src="/assets/images/mark/second-plus.svg"
                      alt="plus-icon"
                    />
                    <p className="company-content-text">Create a new company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationModel;
