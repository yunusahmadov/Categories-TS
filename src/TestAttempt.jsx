import React, { useState } from 'react';
import './App.css'; // Подключите ваш файл стилей CSS

function Category({ category, onAddSubcategory, onAddChildSubcategory }) {
  const [newSubcategory, setNewSubcategory] = useState("");
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);

  const addSubcategory = () => {
    if (newSubcategory.trim() !== "") {
      if (isAddingSubcategory) {
        onAddSubcategory(category.title, newSubcategory);
      } else {
        onAddChildSubcategory(category.title, newSubcategory);
      }
      setNewSubcategory("");
    }
  };

  return (
    <div className='flex' key={category.title}>
      <p className='item'>{category.title}</p>
      {category.sub.map((subData, j) => (
        <div className='flex' key={subData.title}>
          <p className='item'>{subData.title}</p>
          {/* <div>
            <input
              type="text"
              placeholder="Новая подкатегория"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
            <button onClick={addSubcategory}>Добавить {isAddingSubcategory ? "подподкатегорию" : "подкатегорию"}</button>
          </div> */}
        </div>
      ))}
      <div>
        {isAddingSubcategory ? (
          <div>
            <input
              type="text"
              placeholder="Новая подподкатегория"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
            <button onClick={addSubcategory}>Добавить подподкатегорию</button>
          </div>
        ) : (
          <button onClick={() => setIsAddingSubcategory(true)}>Добавить подкатегорию</button>
        )}
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([
    {
      title: '1',
      sub: [
        {
          title: '1.1',
          sub: []
        }
      ]
    },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setData((prevData) => [...prevData, { title: newCategory, sub: [] }]);
      setNewCategory("");
    }
  };

  const addSubcategory = (categoryTitle, newSubcategory) => {
    const updatedData = [...data];
    const categoryIndex = updatedData.findIndex((item) => item.title === categoryTitle);
    if (categoryIndex !== -1) {
      updatedData[categoryIndex].sub.push({ title: newSubcategory, sub: [] });
      setData(updatedData);
    }
  };

  const addChildSubcategory = (categoryTitle, subcategoryTitle, newSubcategory) => {
    const updatedData = [...data];
    const categoryIndex = updatedData.findIndex((item) => item.title === categoryTitle);
    if (categoryIndex !== -1) {
      const subcategoryIndex = updatedData[categoryIndex].sub.findIndex(
        (item) => item.title === subcategoryTitle
      );
      if (subcategoryIndex !== -1) {
        updatedData[categoryIndex].sub[subcategoryIndex].sub.push({
          title: newSubcategory,
          sub: [],
        });
        setData(updatedData);
      }
    }
  };

  return (
    <div className='column'>
      {data.map((category, i) => (
        <Category
          key={category.title}
          category={category}
          onAddSubcategory={(categoryTitle, newSubcategory) => addSubcategory(categoryTitle, newSubcategory)}
          onAddChildSubcategory={(categoryTitle, subcategoryTitle, newSubcategory) =>
            addChildSubcategory(categoryTitle, subcategoryTitle, newSubcategory)
          }
        />
      ))}
      <div>
        <input
          type="text"
          placeholder="Новая категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Добавить категорию</button>
      </div>
    </div>
  );
}

export default App;
