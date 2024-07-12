import React, { useState, useEffect } from "react";

const DesignEffortsCard = ({
  categories,
  designEfforts,
  handleEditDesignEffortClick,
  handleAddDesignEffortClick,
  handleRemoveDesignEffort,
  setActiveCategory,
  activeCategory,
}) => {
  // Effect to set active category to the first valid category on mount or change
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].name);
    }
  }, [categories, setActiveCategory, activeCategory]);

  // Function to handle category tab click
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Function to filter efforts based on active category
  const filteredEfforts = designEfforts.filter(
    (effort) => effort.category === activeCategory
  );

  return (
    <>
      <div className="card mt-4">
        <div className="card-body">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`btn btn-sm me-2 ${
                activeCategory === category.name
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">{activeCategory} Design Efforts</h2>
          <div className="mb-3"></div>
          <button
            className="btn btn-primary mb-3"
            onClick={handleAddDesignEffortClick}
          >
            Add Design Effort
          </button>
          <ul className="list-group list-group-flush">
            {filteredEfforts.map((effort, index) => (
              <li key={effort.id} className="list-group-item">
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
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveDesignEffort(effort.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DesignEffortsCard;
