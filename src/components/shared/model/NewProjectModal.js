import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import useOutsideClick from "@/hooks/useOutsideClick";
import React, { useRef, useState } from "react";

const NewProjectModal = ({
  showProjectPopup,
  setShowProjectPopup,
  fetchProjectList,
}) => {
  const overlayRef = useRef(null);
  const { createProject } = useAuth();
  const [projectName, setProjectName] = useState("");
  const { toaster } = useToaster();

  useOutsideClick(overlayRef, () => {
    if (showProjectPopup) {
      setShowProjectPopup(false);
    }
  });

  const handleSave = async () => {
    if (projectName.trim() === "") {
      toaster("Project name cannot be empty", TOAST_TYPES.ERROR);
      return;
    }

    try {
      const res = await createProject(projectName);

      if (!res.status) {
        return toaster(res.message, TOAST_TYPES.ERROR);
      }

      if (res.status) {
        toaster(res.message, TOAST_TYPES.SUCCESS);
        setShowProjectPopup(false);
        fetchProjectList();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setProjectName("");
    }
  };

  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  return (
    showProjectPopup && (
      <div ref={overlayRef} className="invitation-overlay padding-company">
        <div className="company-content w-100 h-100">
          <div className="box-invitation">
            <div className="d-flex align-items-center justify-content-between border_bottom_faint pb-20">
              <h2 className="company-setup-heading weight-600">
                Create New Project
              </h2>
              <div className="d-flex align-items-center gap-3">
                <button
                  className="close_effort_btn"
                  onClick={() => setShowProjectPopup(false)}
                >
                  <span>Close</span>
                </button>
                <button className="save_effort_btn" onClick={handleSave}>
                  <span>Save</span>
                </button>
              </div>
            </div>
            <div className="d-flex flex-column gap-3 mt-20">
              <label htmlFor="projectName" className="label-company weight-500">
                Add project name
              </label>
              <input
                id="projectName"
                className="form-control w-40"
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NewProjectModal;