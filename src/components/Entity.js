// Entity.js

// import React, { useState } from 'react';

// Test IDs
const EntitySelectTestId = 'entity-select';
const EntityDeleteTestId = 'entity-delete';
const EntityCategoryTestId = 'entity-category';
// const AddEntityCategoryTestId = 'add-entity-category';
// const AddEntitySubmitTestId = 'add-entity-submit';
// const DeleteSelectedTestId = 'delete-selected';
// const EntityTestId = 'entity-item';
// const FilterCategoryTestId = 'filter-category';
// const FilterSubmitTestId = 'filter-submit';

const Entity = ({ id, category, onDelete, onSelect, isSelected }) => {
  return (
    <div className="border border-gray-400 bg-white p-4 mb-2">
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          data-testid={EntitySelectTestId}
          checked={isSelected}
          onChange={() => onSelect(id)}
          className="mt-1"
        />
        <div className="flex-1">
          <ul className="list-disc pl-5">
            <li>Id: {id}</li>
            <li>
              Category: <span data-testid={EntityCategoryTestId}>{category}</span>
            </li>
          </ul>
        </div>
      </div>
      <button 
        data-testid={EntityDeleteTestId}
        onClick={() => onDelete(id)}
        className="mt-2 px-4 py-1 border border-gray-400 bg-red-200 hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
        Delete
      </button>
    </div>
  );
};

export default Entity;