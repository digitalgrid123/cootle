// CategoriesCard.js
import React from "react";

const CategoriesCard = ({
  categories,
  handleEditCategoryClick,
  handleAddCategoryClick,
}) => (
  <div className="card mt-4">
    <div className="card-body">
      <h2 className="card-title">Default Categories</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddCategoryClick}>
        Add Category
      </button>
      <ul className="list-group list-group-flush">
        {categories.map((category, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              {category.name}
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleEditCategoryClick(category, index)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CategoriesCard;
