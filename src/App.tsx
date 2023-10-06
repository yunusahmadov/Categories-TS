import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function App() {
  const [firstTitle, setFirstTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[][]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [newOpenModal, setNewOpenModal] = useState<boolean>(false);
  const [editMainCategory, setEditMainCategory] = useState<boolean>(false);

  const setCategory = () => {
    setTitle(firstTitle);
    setFirstTitle("");
  };

  const deleteCategory = () => {
    setTitle("");
    setSubCategories([]);
  };

  const addSubCategory = () => {
    setNewOpenModal(!newOpenModal);
  };

  const setNewCategory = () => {
    if (inputValue !== "") {
      setSubCategories([...subCategories, [inputValue]]);
      setInputValue("");
    }
  };

  const deleteSubCategory = (mainIndex: number, subIndex: number) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[mainIndex].splice(subIndex, 1);
    setSubCategories(updatedSubCategories);
  };

  const editSubCategory = (mainIndex: number, subIndex: number) => {
    const editedSubCategory = prompt("Edit subcategory:", subCategories[mainIndex][subIndex]);
    if (editedSubCategory !== null) {
      const updatedSubCategories = [...subCategories];
      updatedSubCategories[mainIndex][subIndex] = editedSubCategory;
      setSubCategories(updatedSubCategories);
    }
  };

  const addSubSubCategory = (mainIndex: number) => {
    const newSubCategory = prompt("Add subsubcategory:");
    if (newSubCategory !== null) {
      const updatedSubCategories = [...subCategories];
      updatedSubCategories[mainIndex].push(newSubCategory);
      setSubCategories(updatedSubCategories);
    }
  };


  return (
    <>
      <header>
        <button onClick={setCategory}>Add</button>
        <input
          value={firstTitle}
          type="text"
          placeholder="Add first category"
          onChange={(e) => setFirstTitle(e.target.value)}
        />
      </header>
      {title ? (
        <div className="category">
          {editMainCategory ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={() => setEditMainCategory(false)}>Save</button>
            </>
          ) : (
            <>
              <div>{title}</div>
              <div className="buttons">
                <PencilIcon onClick={() => setEditMainCategory(true)} />
                <TrashIcon onClick={deleteCategory} />
                <PlusIcon onClick={addSubCategory} />
              </div>
            </>
          )}
          {newOpenModal ? (
            <div className="new-modal">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button onClick={setNewCategory}>Add Subcategory</button>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="subcategory-container">
        {subCategories.map((subCategoryArray, mainIndex) => (
          <div key={mainIndex} className="subcategory">
            {subCategoryArray.map((subcategory, subIndex) => (
              <div key={subIndex} className="subsubcategory">
                {subcategory}
                <div className="buttons">
                  <PencilIcon onClick={() => editSubCategory(mainIndex, subIndex)} />
                  <TrashIcon onClick={() => deleteSubCategory(mainIndex, subIndex)} />
            <PlusIcon onClick={() => addSubSubCategory(mainIndex)} />

                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

