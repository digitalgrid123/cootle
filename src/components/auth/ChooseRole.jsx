import React from "react";
import { LOGIN_ROLES } from "@/constants/attributes";

const ChooseRole = ({ onSelectRole }) => {
  
  return (
    <div>
      <div>
        <h4 className=" font-weight-bold">Choose Your Category!</h4>
        <p className="text-muted w-100 d-block">
          Please choose one of these to continue
        </p>
        <div className="mt-4">
          <div className="choosebox">
            {LOGIN_ROLES.map(({ label, value, icon }) => (
              <div
                className="cbox cursor-pointer"
                onClick={() => onSelectRole(value)}
                key={value}
              >
                <div className="text-center">
                  <div className="widgets-icons-2 rounded-circle bg-light-primary text-primary m-auto mb-3">
                    <i className={icon}></i>
                  </div>
                  <div className="fw-medium">Continue as {label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
