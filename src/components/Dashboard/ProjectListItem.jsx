import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_TYPES, USER_ROLES } from "@/constants/keywords";
import { getData } from "@/utils/storage";
import useOutsideClick from "@/hooks/useOutsideClick";

const ProjectListItem = ({ project, isActive, onClick, fetchProjectList }) => {
  const router = useRouter();
  const { deleteProject } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { toaster } = useToaster();
  const dropdownRef = useRef(null);
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);

  useOutsideClick(dropdownRef, () => setDropdownVisible(false));

  const handleClick = () => {
    onClick(project.id);
    router.push(PATH_DASHBOARD.project.view(project.id, project.name));
  };

  const handleDoubleClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setDropdownVisible(!dropdownVisible);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProject(project.id);
      if (response.status) {
        fetchProjectList();
        toaster("Project successfully deleted", TOAST_TYPES.SUCCESS);
      } else {
        toaster("Failed to delete project", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toaster("Error deleting project", TOAST_TYPES.ERROR);
    } finally {
      setDropdownVisible(false);
    }
  };

  return (
    <div className="relative">
      <li
        key={project.id}
        className={`d-flex align-items-center justify-content-between gap-2 cursor-pointer w-100 padding-lr-sixteen mb-16 ${
          isActive ? "navigate-select" : ""
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleRightClick}
      >
        <div className="d-flex align-items-center gap-3">
          <img
            src={
              isActive
                ? "/assets/images/mark/activeproject.svg"
                : "/assets/images/mark/inactiveproject.svg"
            }
            style={{ width: "24px" }}
            alt="project-icon"
          />
          <h4 className="mapping f-16 weight-400">{project.name}</h4>
        </div>
      </li>
      {isAdmin && dropdownVisible && (
        <>
          <ul className="project-dropdown-menu " ref={dropdownRef}>
            <li className="d-flex algin-items-center gap-2 border_bottom_pastel pb-16 cursor-pointer">
              <img src="/assets/images/mark/edit.svg" alt="edit-icon" />
              <span className="edit-project-text">Edit Project</span>
            </li>
            <li
              onClick={handleDelete}
              className="d-flex algin-items-center gap-2 mt-40 cursor-pointer"
            >
              <img
                src="/assets/images/mark/delete.svg"
                alt="profile"
                lazy="loading"
              />
              <span className="delete-project-text">Delete project</span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ProjectListItem;
