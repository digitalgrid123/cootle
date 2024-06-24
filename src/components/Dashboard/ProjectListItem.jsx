import React from "react";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";

const ProjectListItem = ({ project, isActive, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    onClick(project.id); // Notify parent component about click event
    router.push(PATH_DASHBOARD.project.view(project.id, project.name));
  };

  return (
    <li
      key={project.id}
      className={`d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100 projectitem mb-16 ${
        isActive ? "navigate-select" : ""
      }`}
      onClick={handleClick}
    >
      <img
        src={
          isActive
            ? "/assets/images/mark/activeproject.svg"
            : "/assets/images/mark/inactiveproject.svg"
        }
        alt="project-icon"
      />
      <h4 className="mapping f-16 weight-500">{project.name}</h4>
    </li>
  );
};

export default ProjectListItem;
