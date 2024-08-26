import React from "react";

const MappingsCard = ({
  title,
  mappings,
  handleEditMappingClick,
  handleAddMappingClick,
  handleRemoveMapping,
  defaultDesignEfforts,
}) => {
  const typeLabels = {
    VAL: "Value Mapping",
    OUT: "Product Outcomes",
    OBJ: "Objective Mapping",
  };

  const getTypeLabel = (typeValue) => typeLabels[typeValue] || typeValue;

  const getDesignEfforts = (efforts) => {
    return efforts
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
      .join(", ");
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <button
          className="btn btn-primary mb-3"
          onClick={handleAddMappingClick} // Handle click to add new mapping
        >
          Add Mapping
        </button>
        <ul className="list-group list-group-flush mt-3">
          {mappings.map((mapping, index) => (
            <li key={index} className="list-group-item">
              <h5>{mapping.title}</h5>
              <div
                className="description-editable"
                dangerouslySetInnerHTML={{ __html: mapping.description }}
              />

              {/* Uncomment if you decide to display the type */}
              {/* <p>
                <strong>Type:</strong> {getTypeLabel(mapping.type)}
              </p> */}
              <p>
                <strong>Design Efforts:</strong>{" "}
                {Array.isArray(mapping.design_efforts)
                  ? getDesignEfforts(mapping.design_efforts)
                  : ""}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => handleEditMappingClick(mapping, index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveMapping(mapping)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MappingsCard;
