import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_TYPES, USER_ROLES } from "@/constants/keywords";
import { getData } from "@/utils/storage";

const ProjectListItem = ({ project, isActive, onClick, fetchProjectList }) => {
  const router = useRouter();
  const { deleteProject } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { toaster } = useToaster();
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);

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
    <li
      key={project.id}
      className={`d-flex align-items-center justify-content-between gap-2 cursor-pointer w-100 projectitem mb-16 ${
        isActive ? "navigate-select" : ""
      }`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
    >
      <div className="d-flex align-items-center gap-2">
        <img
          src={
            isActive
              ? "/assets/images/mark/activeproject.svg"
              : "/assets/images/mark/inactiveproject.svg"
          }
          alt="project-icon"
        />
        <h4 className="mapping f-16 weight-500">{project.name}</h4>
      </div>

      {isAdmin && dropdownVisible && (
        <div className="project-dropdown-menu">
          <ul>
            <li onClick={handleDelete}>
              <img
                src="/assets/images/mark/delete.svg"
                alt="profile"
                lazy="loading"
                style={{ filter: "invert(1)" }}
              />
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

export default ProjectListItem;
