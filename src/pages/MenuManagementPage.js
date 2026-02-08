import React from 'react';
import AddEntityForm from '../components/AddEntityForm';
import EntitiesList from '../components/EntityList';
import FilterPanel from '../components/FilterEntitiesForm';

// Menu Management Page
const MenuManagementPage = ({ entities, setEntities, selectedIds, setSelectedIds, selectedCategories, setSelectedCategories, addToChangeLog, onViewSummary, onLogout }) => {
  const handleAdd = (newEntity) => {
    setEntities([...entities, newEntity]);
    addToChangeLog({
      action: 'Added',
      description: `Added new category: ${newEntity.category} under ${newEntity.mainCategory}`,
      timestamp: new Date().toLocaleString()
    });
  };

  const handleDelete = (id) => {
    const entity = entities.find(e => e.id === id);
    setEntities(entities.filter(entity => entity.id !== id));
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    if (entity) {
      addToChangeLog({
        action: 'Deleted',
        description: `Deleted category: ${entity.category}`,
        timestamp: new Date().toLocaleString()
      });
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    const deletedCount = selectedIds.length;
    setEntities(entities.filter(entity => !selectedIds.includes(entity.id)));
    addToChangeLog({
      action: 'Bulk Delete',
      description: `Deleted ${deletedCount} categories`,
      timestamp: new Date().toLocaleString()
    });
    setSelectedIds([]);
  };

  const handleToggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredEntities = selectedCategories.length > 0
    ? entities.filter(entity => selectedCategories.includes(entity.category))
    : entities;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-red-900 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">🥢 Menu Management System</h1>
        <div className="flex gap-3">
          <button
            onClick={onViewSummary}
            className="px-4 py-2 bg-gray-700 hover:bg-red-600 rounded transition"
          >
            View Summary
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-700 hover:bg-red-600 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="  p-4 ">
        <AddEntityForm onAdd={handleAdd} />
        <div className="flex gap-4">
          <FilterPanel 
            entities={entities}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory} className="p-4 
  bg-gray-50 text-gray-900
  dark:bg-gray-900 dark:text-gray-50
  min-h-screen
"
          />
          <EntitiesList 
            entities={filteredEntities}
            onDelete={handleDelete}
            onDeleteSelected={handleDeleteSelected}
            selectedIds={selectedIds}
            onSelect={handleSelect} className="p-4 
  bg-gray-50 text-gray-900
  dark:bg-gray-900 dark:text-gray-50
  min-h-screen
"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuManagementPage;
