// DesignEffortsCard.js
import React from "react";

const DesignEffortsCard = ({
  designEfforts,
  handleEditDesignEffortClick,
  handleAddDesignEffortClick,
}) => (
  <div className="card mt-4">
    <div className="card-body">
      <h2 className="card-title">Default Design Efforts</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={handleAddDesignEffortClick}
      >
        Add Design Effort
      </button>
      <ul className="list-group list-group-flush">
        {designEfforts.map((effort, index) => (
          <li key={index} className="list-group-item">
            <h5>{effort.title}</h5>
            <p>
              <strong>Category:</strong> {effort.category}
            </p>
            <p>{effort.description}</p>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleEditDesignEffortClick(effort, index)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default DesignEffortsCard;
