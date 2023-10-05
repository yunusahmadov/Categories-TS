import React, { useState } from "react";
import Category from "./Category";
// Works
function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div>
      <h1>Категории</h1>
      <div>
        <button  onClick={handleAddCategory}>
          Добавить категорию
        </button>
        <input
          type="text"
          placeholder="Новая категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </div>
      <ul className="abc">
        {categories.map((category, index) => (
          <li key={index}>
            <Category
              name={category}
              onDelete={() => handleRemoveCategory(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
