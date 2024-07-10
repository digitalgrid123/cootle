import React from "react";

const CategoriesCard = ({
  categories,
  handleEditCategoryClick,
  handleAddCategoryClick,
  handleRemoveCategory,
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
              <div>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => handleEditCategoryClick(category, index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveCategory(category, index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CategoriesCard;
