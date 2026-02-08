// FilterEntitiesForm.js
import React from 'react';
import {useState} from 'react';

const FilterCategoryTestId = 'filter-category';
const FilterMainCategoryTestId = 'filter-main-category';

const FilterPanel = ({ entities, selectedCategories, onToggleCategory }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState('All');
  const mainCategories = ['All',...new Set(entities.map(e => e.mainCategory))];

  let filteredEntities = entities;
  if (selectedMainCategory !== 'All') {
    filteredEntities = entities.filter(entity => entity.mainCategory === selectedMainCategory);
  }
  
  const uniqueCategories = [...new Set(filteredEntities.map(e => e.category))];

  const handleMainCategoryChange = (e) => {
    setSelectedMainCategory(e.target.value);
  };


  return (
    <div className="p-4 bg-white border border-gray-400 min-w-[150px]">
        <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Main Category</label>
        <select 
          data-testid={FilterMainCategoryTestId}
          value={selectedMainCategory}
          onChange={handleMainCategoryChange}
          className="w-full px-2 py-1 border border-gray-400"
        >
          {mainCategories.map(mainCat => (
            <option key={mainCat} value={mainCat}>
              {mainCat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2 text-sm font-medium">Select Sub-Categories</div>     
      {uniqueCategories.map(category => (
        <div key={category} className="mb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              data-testid={FilterCategoryTestId}
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory(category)}
            />
            <span className="text-sm">{category}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;