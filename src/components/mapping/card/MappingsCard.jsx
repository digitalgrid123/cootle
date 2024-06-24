import React from "react";

const MappingsCard = ({
  mappings,
  handleEditMappingClick,
  handleAddMappingClick,
  defaultDesignEfforts,
}) => {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">Default Mappings</h2>
        <button
          className="btn btn-primary mb-3"
          onClick={handleAddMappingClick}
        >
          Add Mapping
        </button>
        <ul className="list-group list-group-flush">
          {mappings.map((mapping, index) => (
            <li key={index} className="list-group-item">
              <h5>{mapping.title}</h5>
              <p>{mapping.description}</p>
              <p>
                <strong>Type:</strong> {mapping.type}
              </p>
              <p>
                <strong>Design Efforts:</strong>{" "}
                {Array.isArray(mapping.design_efforts)
                  ? mapping.design_efforts
                      .map((effortId) => {
                        if (typeof effortId === "number") {
                          const designEffort = defaultDesignEfforts.find(
                            (effort) => effort.id === effortId
                          );
                          return designEffort ? designEffort.title : effortId;
                        } else if (typeof effortId === "string") {
                          const designEffort = defaultDesignEfforts.find(
                            (effort) => effort.title === effortId
                          );
                          return designEffort ? designEffort.title : effortId;
                        }
                        return effortId;
                      })
                      .join(", ")
                  : ""}
              </p>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleEditMappingClick(mapping, index)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MappingsCard;
