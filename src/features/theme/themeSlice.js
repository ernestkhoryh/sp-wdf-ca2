// features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to get system preference
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Helper function to get saved theme from localStorage
const getSavedTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme');
  }
  return null;
};

const initialState = {
  mode: getSavedTheme() || 'system', // 'light', 'dark', or 'system'
  systemPreference: getSystemTheme(), // Track actual system preference
  colors: {
    light: {
      background: '#ffffff',
      text: '#000000',
      primary: '#3b82f6',
      secondary: '#6b7280',
    },
    dark: {
      background: '#1f2937',
      text: '#f9fafb',
      primary: '#60a5fa',
      secondary: '#9ca3af',
    },
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Set theme to light mode
    setLightTheme: (state) => {
      state.mode = 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      }
    },
    
    // Set theme to dark mode
    setDarkTheme: (state) => {
      state.mode = 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      }
    },
    
    // Set theme to follow system preference
    setSystemTheme: (state) => {
      state.mode = 'system';
      if (typeof window !== 'undefined') {
        localStorage.removeItem('theme');
        if (state.systemPreference === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    
    // Toggle between light and dark (skip system mode when toggling)
    toggleTheme: (state) => {
      const currentTheme = state.mode === 'system' 
        ? state.systemPreference 
        : state.mode;
      
      if (currentTheme === 'light') {
        themeSlice.caseReducers.setDarkTheme(state);
      } else {
        themeSlice.caseReducers.setLightTheme(state);
      }
    },
    
    // Update system preference (called when system theme changes)
    updateSystemPreference: (state, action) => {
      state.systemPreference = action.payload;
      if (state.mode === 'system') {
        if (action.payload === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    
    // Update color scheme
    updateColorScheme: (state, action) => {
      const { mode, colors } = action.payload;
      if (state.colors[mode]) {
        state.colors[mode] = { ...state.colors[mode], ...colors };
      }
    },
    
    // Reset to default theme
    resetTheme: (state) => {
      state.mode = 'system';
      state.colors = initialState.colors;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('theme');
        if (getSystemTheme() === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
  },
});

// MAKE SURE ALL ACTIONS ARE EXPORTED HERE
export const { 
  setLightTheme, 
  setDarkTheme, 
  setSystemTheme, 
  toggleTheme, 
  updateSystemPreference,
  updateColorScheme,
  resetTheme  // ADD THIS LINE
} = themeSlice.actions;

export default themeSlice.reducer;