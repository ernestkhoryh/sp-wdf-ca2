import React, { useState } from 'react';
import LoginPage from './pages/LoginPage.js';
import MenuManagementPage from './pages/MenuManagementPage.js';
import SummaryPage from './pages/SummaryPage.js';
// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('menu');
  const [changeLog, setChangeLog] = useState([]);
  const [entities, setEntities] = useState([
    { id: '2BcSwXwrgsEUEuOc', mainCategory: 'Main Dishes', category: 'Poultry (鸡鸭类)' },
    { id: '2mizLAOthci1SVqE', mainCategory: 'Main Dishes', category: 'Poultry (鸡鸭类)' },
    { id: 'yiL8gabOSk6yvCur', mainCategory: 'Main Dishes', category: 'Pork (猪肉类)' },
    { id: 'AnzJ4MKd4zEFADfj', mainCategory: 'Main Dishes', category: 'Beef & Lamb (牛羊肉类)' },
    { id: 'LFq5XYfGTmJCOhZz', mainCategory: 'Main Dishes', category: 'Seafood (海鲜类)' },
    { id: 'Tz9mPqR3sNvK2wXy', mainCategory: 'Main Dishes', category: 'Vegetables & Tofu (蔬菜豆腐类)' },
    { id: 'Jk4LmN7pQrS8tUvW', mainCategory: 'Starches & Staples', category: 'Rice Dishes (饭类)' },
    { id: 'Cx5VbN9mAsD2fGhJ', mainCategory: 'Starches & Staples', category: 'Noodle Dishes (面条类)' },
    { id: 'Hx2YzA8bCdE4fGiJ', mainCategory: 'Starches & Staples', category: 'Dumplings & Buns (饺子/包子)' }
  ]);
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const addToChangeLog = (log) => {
    setChangeLog(prev => [log, ...prev]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('menu');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('menu');
  };

  const handleViewSummary = () => {
    setCurrentPage('summary');
  };

  const handleReturnToMain = () => {
    setCurrentPage('menu');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {currentPage === 'menu' && (
        <MenuManagementPage 
          entities={entities}
          setEntities={setEntities}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          addToChangeLog={addToChangeLog}
          onViewSummary={handleViewSummary}
          onLogout={handleLogout}
        />
        
      )}
      {currentPage === 'summary' && (
        <SummaryPage 
          changeLog={changeLog}
          onReturnToMain={handleReturnToMain}
        />
      )}
    </>
  );
};

export default App;
