import React, { useState } from "react";
import "./App.css"; 
// Works
interface CategoryProps {
  name: string;
  onDelete: () => void;
}

const Category: React.FC<CategoryProps> = ({ name, onDelete }) => {
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [newSubCategory, setNewSubCategory] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(name);

  const handleAddSubCategory = () => {
    if (newSubCategory) {
      setSubCategories([...subCategories, newSubCategory]);
      setNewSubCategory("");
    }
  };

  const handleRemoveSubCategory = (index: number) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories.splice(index, 1);
    setSubCategories(updatedSubCategories);
  };

  const handleEditCategory = () => {
    setIsEditing(true);
  };

  const handleSaveCategory = () => {
    setIsEditing(false);
  };

  const handleDeleteCategory = () => {
    onDelete();
  };

  return (
    <div className="category"> 
      <h3>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          editedName
        )}
      </h3>
      <div>
        {isEditing ? (
          <button  onClick={handleSaveCategory}>
           Save
          </button>
        ) : (
          <button  onClick={handleEditCategory}>
            Edit
          </button>
        )}
        <button  onClick={handleDeleteCategory}>
          Delete
        </button>
      </div>
      <div>
        <button  onClick={handleAddSubCategory}>
         Add SubCategory
        </button>
        <input
          type="text"
          placeholder="New subcategory"
          value={newSubCategory}
          onChange={(e) => setNewSubCategory(e.target.value)}
        />
      </div>
      {subCategories.map((subCategory, index) => (
        <Category
          key={index}
          name={subCategory}
          onDelete={() => handleRemoveSubCategory(index)}
        />
      ))}
    </div>
  );
};

export default Category;
