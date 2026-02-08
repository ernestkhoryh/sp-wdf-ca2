// components/ThemeToggle.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
  setLightTheme, 
  setDarkTheme, 
  setSystemTheme, 
  toggleTheme,
  updateSystemPreference,
  resetTheme  // ADD THIS IMPORT
} from '../features/theme/themeSlice';

// Icons for the theme toggle
const SunIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const SystemIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
  </svg>
);

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  
  // Get the actual theme being displayed
  const currentTheme = theme.mode === 'system' ? theme.systemPreference : theme.mode;

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      dispatch(updateSystemPreference(e.matches ? 'dark' : 'light'));
    };
    
    // Set initial system preference
    handleChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  // Apply theme classes to document on mount and theme change
  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  // Get theme display name
  const getThemeDisplayName = () => {
    if (theme.mode === 'system') {
      return `System (${theme.systemPreference})`;
    }
    return theme.mode.charAt(0).toUpperCase() + theme.mode.slice(1);
  };

  // Get theme icon
  const getThemeIcon = () => {
    if (theme.mode === 'system') {
      return <SystemIcon />;
    }
    return theme.mode === 'dark' ? <MoonIcon /> : <SunIcon />;
  };

  // Get next theme for cycling
  const getNextTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme.mode);
    return themes[(currentIndex + 1) % themes.length];
  };

  // Handle theme cycling
  const cycleTheme = () => {
    const nextTheme = getNextTheme();
    switch (nextTheme) {
      case 'light':
        dispatch(setLightTheme());
        break;
      case 'dark':
        dispatch(setDarkTheme());
        break;
      case 'system':
        dispatch(setSystemTheme());
        break;
      default:
        dispatch(setLightTheme());
    }
  };

  return (

    <div className="theme-toggle">
      <div className="flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

          

        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dispatch(setLightTheme())}
            className={`px-4 py-2 rounded-lg flex-1 min-w-[100px] ${
              theme.mode === 'light'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <SunIcon />
              <span>Light</span>
            </div>
          </button>
          
          <button
            onClick={() => dispatch(setDarkTheme())}
            className={`px-4 py-2 rounded-lg flex-1 min-w-[100px] ${
              theme.mode === 'dark'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MoonIcon />
              <span>Dark</span>
            </div>
          </button>
         </div>
        </div>
      </div>
    </div>

  );
};

export default ThemeToggle;