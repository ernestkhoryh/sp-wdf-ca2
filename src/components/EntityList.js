// EntitiesList.js

import React from 'react';
import Entity from './Entity.js';

const DeleteSelectedTestId = 'delete-selected';
const EntityTestId = 'entity-item';

const EntitiesList = ({ entities, onDelete, onDeleteSelected, selectedIds, onSelect }) => {
  const filteredEntities = entities;

  return (
    <div className="flex-1">
      {selectedIds.length > 0 && (
        <button 
          data-testid={DeleteSelectedTestId}
          onClick={onDeleteSelected}
          className="mb-4 px-4 py-1 border border-gray-400 bg-red-400 hover:bg-gray-100"
        >

          Bulk Delete
        </button>
      )}

      <ul className="list-none p-0">
        {filteredEntities.length === 0 ? (
          <li className="text-gray-500 p-4">No entities found</li>
        ) : (
          filteredEntities.map(entity => (
            <li key={entity.id} data-testid={EntityTestId}>
              <Entity 
                {...entity}
                onDelete={onDelete}
                onSelect={onSelect}
                isSelected={selectedIds.includes(entity.id)}
                imageUrl={entity.imageUrl}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EntitiesList;