// App.js
import React, { useState } from 'react';
import AddEntityForm from './AddEntityForm.js';
import EntitiesList from './EntityList.js';
import FilterPanel from './FilterEntitiesForm.js';

const App = () => {
  const [entities, setEntities] = useState([
  { id: '2BcSwXwrgsEUEuOc', mainCategory: 'Proteins (蛋白)', category: 'Poultry (鸡鸭)' , imageUrl: 'https://images.pexels.com/photos/30120280/pexels-photo-30120280.jpeg' },
  { id: 'yiL8gabOSk6yvCur', mainCategory: 'Proteins (蛋白)', category: 'Pork (猪肉)' , imageUrl: 'https://images.pexels.com/photos/35174112/pexels-photo-35174112.jpeg' },
  { id: 'AnzJ4MKd4zEFADfj', mainCategory: 'Proteins (蛋白)', category: 'Beef & Lamb (牛羊肉)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
  { id: 'LFq5XYfGTmJCOhZz', mainCategory: 'Proteins (蛋白)', category: 'Seafood (海鲜)' , imageUrl: 'https://images.pexels.com/photos/29160631/pexels-photo-29160631.jpeg' },  

  { id: 'Tz9mPqR3sNvK2wXy', mainCategory: 'Vegetables & Tofu (蔬菜豆腐)', category: 'Vegetables (蔬菜)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
  { id: 'R8mPZx2cYk9BfWQa', mainCategory: 'Vegetables & Tofu (蔬菜豆腐)', category: 'Tofu (豆腐)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },

  { id: 'Jk4LmN7pQrS8tUvW', mainCategory: 'Grains (米饭面)', category: 'Rice Dishes (饭)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
  { id: 'M3XQ9YkW7FZp8C2A', mainCategory: 'Grains (米饭面)', category: 'Congee (粥)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
  { id: 'Cx5VbN9mAsD2fGhJ', mainCategory: 'Grains (米饭面)', category: 'Noodle Dishes (面)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },

  { id: 'Hx2YzA8bCdE4fGiJ', mainCategory: 'Dumpings and Buns (面粉)', category: 'Dumplings (饺子)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' }, 
  { id: 'V6PZK4FQY3mN8X2W', mainCategory: 'Dumpings and Buns (面粉)', category: 'Baos (包)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },    
  { id: 'Q9F7mXW3ZP2C8YKA', mainCategory: 'Dumpings and Buns (面粉)', category: 'Spring Rolls (春卷)' , imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },

  { id: 'H5K8vR2M7XW1N9QB', mainCategory: 'Other main(其他主类)', category: '-', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' }

  ]);
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleAdd = (newEntity) => {
    setEntities([...entities, newEntity]);
  };

  const handleDelete = (id) => {
    setEntities(entities.filter(entity => entity.id !== id));
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setEntities(entities.filter(entity => !selectedIds.includes(entity.id)));
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
    <div className="min-h-screen bg-white p-4">
      <AddEntityForm onAdd={handleAdd} />
      
      <div className="flex gap-4">
        <FilterPanel 
          entities={entities}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
        />
        
        <EntitiesList 
          entities={filteredEntities}
          onDelete={handleDelete}
          onDeleteSelected={handleDeleteSelected}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default App;