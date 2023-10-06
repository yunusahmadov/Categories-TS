import{ useState } from "react";
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
    <p className="created">Created by:yunusahmadov</p>

      <h1>Category</h1>
      <div>
        <button  onClick={handleAddCategory}>
          Add Category
        </button>
        <input
          type="text"
          placeholder="New Category"
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
