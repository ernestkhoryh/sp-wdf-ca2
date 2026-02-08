// App.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './pages/LoginPage.js';
import MenuManagementPage from './pages/MenuManagementPage.js';
import SummaryPage from './pages/SummaryPage.js';
import ThemeToggle from './components/ThemeToggle';
import { updateSystemPreference } from './features/theme/themeSlice';

// Main App Component
const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  
  // Get the actual theme being displayed
  const currentTheme = theme.mode === 'system' ? theme.systemPreference : theme.mode;
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('menu');
  const [changeLog, setChangeLog] = useState([]);
  const [entities, setEntities] = useState([
    { id: '2BcSwXwrgsEUEuOc', mainCategory: 'Proteins (蛋白)', category: 'Poultry (鸡鸭)', imageUrl: 'https://images.pexels.com/photos/30120280/pexels-photo-30120280.jpeg' },
    { id: 'yiL8gabOSk6yvCur', mainCategory: 'Proteins (蛋白)', category: 'Pork (猪肉)', imageUrl: 'https://images.pexels.com/photos/35174112/pexels-photo-35174112.jpeg' },
    { id: 'AnzJ4MKd4zEFADfj', mainCategory: 'Proteins (蛋白)', category: 'Beef & Lamb (牛羊肉)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
    { id: 'LFq5XYfGTmJCOhZz', mainCategory: 'Proteins (蛋白)', category: 'Seafood (海鲜)', imageUrl: 'https://images.pexels.com/photos/29160631/pexels-photo-29160631.jpeg' },  
    { id: 'Tz9mPqR3sNvK2wXy', mainCategory: 'Vegetables & Tofu (蔬菜豆腐)', category: 'Vegetables (蔬菜)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
    { id: 'R8mPZx2cYk9BfWQa', mainCategory: 'Vegetables & Tofu (蔬菜豆腐)', category: 'Tofu (豆腐)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
    { id: 'Jk4LmN7pQrS8tUvW', mainCategory: 'Grains (米饭面)', category: 'Rice Dishes (饭)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
    { id: 'M3XQ9YkW7FZp8C2A', mainCategory: 'Grains (米饭面)', category: 'Congee (粥)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
    { id: 'Cx5VbN9mAsD2fGhJ', mainCategory: 'Grains (米饭面)', category: 'Noodle Dishes (面)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
    { id: 'Hx2YzA8bCdE4fGiJ', mainCategory: 'Dumpings and Buns (面粉)', category: 'Dumplings (饺子)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' }, 
    { id: 'V6PZK4FQY3mN8X2W', mainCategory: 'Dumpings and Buns (面粉)', category: 'Baos (包)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },    
    { id: 'Q9F7mXW3ZP2C8YKA', mainCategory: 'Dumpings and Buns (面粉)', category: 'Spring Rolls (春卷)', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' },
    { id: 'H5K8vR2M7XW1N9QB', mainCategory: 'Other main(其他主类)', category: '-', imageUrl: 'https://images.pexels.com/photos/34834550/pexels-photo-34834550.jpeg' }
  ]);
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        dispatch(updateSystemPreference(e.matches ? 'dark' : 'light'));
      };
      
      // Set initial system preference
      handleChange(mediaQuery);
      
      // Listen for changes
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [dispatch]);

  // Apply theme classes to document on mount and theme change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [currentTheme]);

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

  // Common layout for logged-in pages
  const LoggedInLayout = ({ children, showThemeToggle = true }) => (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {showThemeToggle && (
        <div className="fixed top-4 right-4 z-50">
          <div className="w-64">
            <ThemeToggle />
          </div>
        </div>
      )}
      {children}
    </div>
  );

  return (
    <>
      {currentPage === 'menu' && (
        <LoggedInLayout>
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
        </LoggedInLayout>
      )}
      {currentPage === 'summary' && (
        <LoggedInLayout>
          <SummaryPage 
            changeLog={changeLog}
            onReturnToMain={handleReturnToMain}
          />
        </LoggedInLayout>
      )}
    </>
  );
};

export default App;