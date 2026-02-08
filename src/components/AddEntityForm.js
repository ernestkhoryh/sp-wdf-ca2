// AddEntityForm.js
import React, { useState } from 'react';

const AddEntityCategoryTestId = 'add-entity-category';
const AddEntitySubmitTestId = 'add-entity-submit';

const mainCategories = [
  'Proteins (蛋白)',
  'Vegetables & Tofu (蔬菜豆腐)',
  'Grains (米饭面)',
  'Dumpings and Buns (面粉)',
  'Other main(其他主类)'
];

const AddEntityForm = ({ onAdd }) => {
  const [category, setCategory] = useState('');
  const [mainCategory, setMainCategory] = useState('');

// Generate random alphanumeric ID
const generateId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mainCategory.trim() || !category.trim()) {
      alert('Please fill in all fields');
      return;
    }
    else {
      const newEntity = {
        id: generateId(),
        mainCategory: mainCategory.trim(),
        category: category.trim()
      };

      onAdd(newEntity);

      setCategory('');
      setMainCategory('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-4 p-4 bg-white">
      <div className="flex items-center gap-2">

        <label className="font-serif text-lg">Add new category</label>
        <select
          data-testid={AddEntityCategoryTestId}
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          onKeyDown = {handleKeyDown}
          className="px-2 py-1 border border-gray-400 flex-1 max-w-xs"
        >
          <option value="">Select Main Category</option>
          {mainCategories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        
        <input 
          type="text" 
          placeholder="Enter sub-category"
          data-testid={AddEntityCategoryTestId}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown = {handleKeyDown}
          className="px-2 py-1 border border-gray-400 flex-1 max-w-xs"
        />
        <input 
          type="submit" 
          data-testid={AddEntitySubmitTestId}
          value="add"
          onClick={handleSubmit}
          className="px-4 py-1 border border-gray-400 bg-green-100 hover:bg-green-700 active:bg-green-800 cursor-pointer transition-colors"
          style={{
            backgroundColor: 'green',
            color: 'white',
            border: '1px solid #16a34a'
          }}
        />
      </div>
    </div>
  );
};

export default AddEntityForm;