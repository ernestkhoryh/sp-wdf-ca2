// Entity.js

import React, { useState, useRef, useEffect } from 'react';

// Test IDs
const EntitySelectTestId = 'entity-select';
const EntityDeleteTestId = 'entity-delete';
const EntityCategoryTestId = 'entity-category';
const AddEntityCategoryTestId = 'add-entity-category';
const AddEntitySubmitTestId = 'add-entity-submit';
const DeleteSelectedTestId = 'delete-selected';
const EntityTestId = 'entity-item';
const FilterCategoryTestId = 'filter-category';
const FilterSubmitTestId = 'filter-submit';

const Entity = ({ id, category, onDelete, onSelect, isSelected, imageUrl }) => {

  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef();
  
  // Preload image when component mounts or imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        console.log('Image preloaded:', imageUrl);
      };
      img.onerror = () => {
        console.error('Failed to preload image:', imageUrl);
      };
    }
  }, [imageUrl]);



  const [showImage, setShowImage] = useState(false);  
    const handleMouseEnter = () => {
    if (imageUrl) {
      setShowImage(true);
    }
  };
  
  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setShowImage(false);
  };
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
            
            <li 
              onMouseEnter={() => imageUrl && setShowImage(true)}
              onMouseLeave={() => setShowImage(false)}
            >
              Id: <span className="cursor-help text-blue-600">{id}</span>
            </li>
            <li 
              onMouseEnter={() => imageUrl && setShowImage(true)}
              onMouseLeave={() => setShowImage(false)}
            >
              Category: <span data-testid={EntityCategoryTestId} className="cursor-help text-blue-600">{category}</span>
            </li>
            {showImage && imageUrl && (

  <li>
    <img src={imageUrl} alt="Entity" className="w-full h-48 object-cover rounded" />
  </li>
)}

          

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