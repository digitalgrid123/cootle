"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth, useToaster } from "@/hooks"; // Importing useClient from hooks
import { TOAST_TYPES } from "@/constants/keywords";
import CategoriesCard from "@/components/mapping/card/CategoriesCard";
import DesignEffortsCard from "@/components/mapping/card/DesignEffortsCard";
import MappingsCard from "@/components/mapping/card/MappingsCard";
import EditCategoryModal from "@/components/mapping/model/EditCategoryModal";
import EditDesignEffortModal from "@/components/mapping/model/EditDesignEffortModal";
import EditMappingModal from "@/components/mapping/model/EditMappingModal";
import AddCategoryModal from "@/components/mapping/model/AddCategoryModal";
import AddDesignEffortModal from "@/components/mapping/model/AddDesignEffortModal";
import AddMappingModal from "@/components/mapping/model/AddMappingModal";
import PasswordForm from "@/components/mapping/form/PasswordForm";
import { Nav, Tab } from "react-bootstrap";

const MappingPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getdefaultmapping, defaultmapping } = useAuth();
  const [activeCategory, setActiveCategory] = useState("");
  const { toaster } = useToaster();
  const [data, setData] = useState({
    default_categories: [],
    default_design_efforts: [],
    default_mappings: [],
  });
  const [activeKey, setActiveKey] = useState("categories");

  const [showDesignEffortModal, setShowDesignEffortModal] = useState(false);
  const [selectedDesignEffort, setSelectedDesignEffort] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [designEffortIndex, setDesignEffortIndex] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
  });
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState({
    title: "",
    description: "",
    type: "",
    design_efforts: [], // Now an array of objects { title: "", id: "" }
  });

  const [mappingIndex, setMappingIndex] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddDesignEffortModal, setShowAddDesignEffortModal] =
    useState(false);
  const [showAddMappingModal, setShowAddMappingModal] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getdefaultmapping(); // Assuming getdefaultmapping is a method in your client instance
        if (res?.status) {
          setData(res.data);
        } else {
          console.error("Failed to fetch mapping data");
        }
      } catch (err) {
        console.error("Error fetching mapping data:", err);
      }
    };

    fetchUserInfo();
  }, [getdefaultmapping]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } else {
      toaster("Incorrect password", TOAST_TYPES.ERROR);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setPassword("");
  };

  const handleSaveDesignEffortChanges = (editedDesignEffort) => {
    const updatedDesignEfforts = data.default_design_efforts.map((item) =>
      item.id === editedDesignEffort.id ? editedDesignEffort : item
    );

    setData((prevData) => ({
      ...prevData,
      default_design_efforts: updatedDesignEfforts,
    }));
    setShowDesignEffortModal(false);
  };

  const handleSaveCategoryChanges = () => {
    const updatedCategories = [...data.default_categories];
    updatedCategories[categoryIndex] = selectedCategory;

    const updatedDesignEfforts = data.default_design_efforts.map((effort) =>
      effort.category === data.default_categories[categoryIndex].name
        ? { ...effort, category: selectedCategory.name }
        : effort
    );

    setData((prevData) => ({
      ...prevData,
      default_categories: updatedCategories,
      default_design_efforts: updatedDesignEfforts,
    }));

    setShowCategoryModal(false);
  };

  const handleSaveMappingChanges = () => {
    const updatedMappings = [...data.default_mappings];
    const existingMappingIndex = updatedMappings.findIndex(
      (m) => m.id === selectedMapping.id
    );

    if (existingMappingIndex !== -1) {
      // Update existing mapping if found by index
      updatedMappings[existingMappingIndex] = selectedMapping;
    } else {
      // Add new mapping to the list if no existing mapping found
      updatedMappings.push(selectedMapping);
    }

    setData((prevData) => ({
      ...prevData,
      default_mappings: updatedMappings,
    }));

    setShowMappingModal(false);
  };

  const handleAddCategory = (newCategory) => {
    setData((prevData) => ({
      ...prevData,
      default_categories: [...prevData.default_categories, newCategory],
    }));
    setShowAddCategoryModal(false);
  };

  const handleAddDesignEffort = (newDesignEffort) => {
    return new Promise((resolve, reject) => {
      setData((prevData) => ({
        ...prevData,
        default_design_efforts: [
          ...prevData.default_design_efforts,
          newDesignEffort,
        ],
      }));

      setShowAddDesignEffortModal(false);
      resolve(true); // Resolve with true or success status
      // If there are any conditions where you need to reject the promise, you can use `reject(false);`
    });
  };

  const handleAddMapping = (newMapping) => {
    setData((prevData) => ({
      ...prevData,
      default_mappings: [...prevData.default_mappings, newMapping],
    }));
    setShowAddMappingModal(false);
  };

  const handleEditCategoryClick = (category, index) => {
    setSelectedCategory(category);
    setCategoryIndex(index);
    setShowCategoryModal(true);
  };

  const handleEditDesignEffortClick = (designEffort, index) => {
    setSelectedDesignEffort(designEffort);
    setDesignEffortIndex(index);
    setShowDesignEffortModal(true);
  };

  const handleEditMappingClick = (mapping, index) => {
    setSelectedMapping(mapping);
    setMappingIndex(index);
    setShowMappingModal(true);
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryModal(true);
  };

  const handleAddDesignEffortClick = () => {
    setShowAddDesignEffortModal(true);
  };

  const handleAddMappingClick = () => {
    setShowAddMappingModal(true);
  };

  const exportAsJson = async () => {
    const exportData = {
      default_categories: data.default_categories.map((category) => ({
        name: category.name,
      })),
      default_design_efforts: data.default_design_efforts.map(
        (effort, index) => ({
          id: index, // Using index as a simple identifier
          title: effort.title,
          category: effort.category,
          description: effort.description,
        })
      ),
      default_mappings: data.default_mappings.map((mapping, index) => ({
        id: index, // or mapping.id if each mapping has an id
        title: mapping.title,
        description: mapping.description,
        type: mapping.type,
        design_efforts: mapping.design_efforts.map((effort) => {
          if (typeof effort === "string") {
            return effort; // Keep the title as is if it's already a string
          } else if (typeof effort === "object" && effort.title) {
            return effort.title; // Extract title if it's an object
          } else {
            return effort.toString(); // Convert other types to string (fallback)
          }
        }),
      })),
    };

    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const formData = new FormData();
    formData.append("json_file", blob, "mapping_data.json");

    try {
      const response = await defaultmapping(formData);

      if (!response.status) {
        toaster("Unable to Upload File", TOAST_TYPES.ERROR);
      } else {
        toaster("File Uploaded Successfully", TOAST_TYPES.SUCCESS);
        await getdefaultmapping();
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      toaster("Error uploading file", TOAST_TYPES.ERROR);
    }
  };

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target || e;

    if (name === "design_efforts" && selectedOptions) {
      const selectedTitles = Array.from(selectedOptions).map(
        (option) => option.value
      );

      setSelectedMapping((prevMapping) => ({
        ...prevMapping,
        [name]: selectedTitles,
      }));
    } else {
      setSelectedMapping((prevMapping) => ({
        ...prevMapping,
        [name]: value,
      }));
    }
  };

  const handleRemoveCategory = async (index) => {
    const updatedCategories = [...data.default_categories];
    const removedCategory = updatedCategories.splice(index, 1)[0];

    // Remove design efforts linked to the removed category
    const updatedDesignEfforts = data.default_design_efforts.filter(
      (effort) => effort.category !== removedCategory.name
    );

    // Remove mappings linked to the removed category
    const updatedMappings = data.default_mappings.filter((mapping) => {
      const isLinked = mapping.design_efforts.some(
        (effort) => effort.category === removedCategory.name
      );
      return !isLinked;
    });

    setData((prevData) => ({
      ...prevData,
      default_categories: updatedCategories,
      default_design_efforts: updatedDesignEfforts,
      default_mappings: updatedMappings,
    }));

    if (activeCategory === index) {
      setActiveCategory(""); // Clear active category if it was removed
    }
  };

  const handleRemoveDesignEffort = (index) => {
    const updatedDesignEfforts = [...data.default_design_efforts];
    const removedEffort = updatedDesignEfforts.splice(index, 1)[0];

    // Remove mappings linked to the removed design effort
    const updatedMappings = data.default_mappings.filter(
      (mapping) => !mapping.design_efforts.includes(removedEffort)
    );

    setData((prevData) => ({
      ...prevData,
      default_design_efforts: updatedDesignEfforts,
      default_mappings: updatedMappings,
    }));
  };

  const handleRemoveMapping = (index) => {
    const updatedMappings = [...data.default_mappings];
    const removedMapping = updatedMappings.splice(index, 1)[0];

    // Remove any references to this mapping in design efforts
    const updatedDesignEfforts = data.default_design_efforts.map((effort) => {
      const updatedDesigns = effort.design_efforts.filter(
        (design) => design.id !== removedMapping.id
      );
      return {
        ...effort,
        design_efforts: updatedDesigns,
      };
    });

    setData((prevData) => ({
      ...prevData,
      default_design_efforts: updatedDesignEfforts,
      default_mappings: updatedMappings,
    }));
  };

  return isAuthenticated ? (
    <div className="container mt-5">
      <div className="row">
        <div className="d-flex align-items-center justify-content-end">
          <button className="btn btn-primary mb-3" onClick={exportAsJson}>
            Upload Data
          </button>
          <button className="btn btn-danger mb-3 ms-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <Tab.Container
        defaultActiveKey="categories"
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
      >
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="categories">Effort Categories</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="designEfforts">Effort List</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="OBJ">Objective Mapping</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="VAL">Value Mapping</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="OUT">Product Outcomes</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="categories">
            <div className="row">
              <CategoriesCard
                categories={data.default_categories}
                handleEditCategoryClick={handleEditCategoryClick}
                handleAddCategoryClick={handleAddCategoryClick}
                handleRemoveCategory={handleRemoveCategory}
              />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="designEfforts">
            <div className="row">
              <DesignEffortsCard
                categories={data.default_categories}
                designEfforts={data.default_design_efforts}
                handleEditDesignEffortClick={handleEditDesignEffortClick}
                handleAddDesignEffortClick={handleAddDesignEffortClick}
                handleRemoveDesignEffort={handleRemoveDesignEffort}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="VAL">
            <MappingsCard
              title="Default Value Mapping"
              mappings={data.default_mappings.filter(
                (mapping) => mapping.type === "VAL"
              )}
              defaultDesignEfforts={data.default_design_efforts}
              handleEditMappingClick={handleEditMappingClick}
              handleAddMappingClick={handleAddMappingClick}
              handleRemoveMapping={handleRemoveMapping}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="OUT">
            <MappingsCard
              title="Default Product Outcome"
              mappings={data.default_mappings.filter(
                (mapping) => mapping.type === "OUT"
              )}
              defaultDesignEfforts={data.default_design_efforts}
              handleEditMappingClick={handleEditMappingClick}
              handleAddMappingClick={handleAddMappingClick}
              handleRemoveMapping={handleRemoveMapping}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="OBJ">
            <MappingsCard
              title="Default Objective Mapping"
              mappings={data.default_mappings.filter(
                (mapping) => mapping.type === "OBJ"
              )}
              defaultDesignEfforts={data.default_design_efforts}
              handleEditMappingClick={handleEditMappingClick}
              handleAddMappingClick={handleAddMappingClick}
              handleRemoveMapping={handleRemoveMapping}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <EditCategoryModal
        show={showCategoryModal}
        handleClose={() => setShowCategoryModal(false)}
        category={selectedCategory}
        handleChange={(e) =>
          setSelectedCategory({
            ...selectedCategory,
            [e.target.name]: e.target.value,
          })
        }
        handleSave={handleSaveCategoryChanges}
      />
      <EditDesignEffortModal
        show={showDesignEffortModal}
        handleClose={() => setShowDesignEffortModal(false)}
        designEffort={selectedDesignEffort}
        handleChange={(e) =>
          setSelectedDesignEffort({
            ...selectedDesignEffort,
            [e.target.name]: e.target.value,
          })
        }
        categories={data.default_categories}
        handleSave={handleSaveDesignEffortChanges}
        activeCategory={activeCategory} // Pass activeCategory
      />
      <AddCategoryModal
        show={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
        handleSave={handleAddCategory}
      />

      <AddDesignEffortModal
        show={showAddDesignEffortModal}
        handleClose={() => setShowAddDesignEffortModal(false)}
        categories={data.default_categories}
        handleSave={handleAddDesignEffort}
        activeCategory={activeCategory} // Pass activeCategory
      />

      <EditMappingModal
        show={showMappingModal}
        handleClose={() => setShowMappingModal(false)}
        mapping={selectedMapping}
        handleChange={handleChange}
        defaultDesignEfforts={data.default_design_efforts}
        handleSave={handleSaveMappingChanges}
      />

      <AddMappingModal
        show={showAddMappingModal}
        handleClose={() => setShowAddMappingModal(false)}
        defaultDesignEfforts={data.default_design_efforts}
        handleSave={handleAddMapping}
        mappingType={activeKey}
      />
    </div>
  ) : (
    <PasswordForm
      password={password}
      setPassword={setPassword}
      handlePasswordSubmit={handlePasswordSubmit}
    />
  );
};

export default MappingPage;
