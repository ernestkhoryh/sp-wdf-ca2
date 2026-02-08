// hooks/useTheme.js
import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleTheme, 
  setLightTheme, 
  setDarkTheme, 
  setSystemTheme 
} from '../features/theme/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  
  const currentTheme = theme.mode === 'system' ? theme.systemPreference : theme.mode;
  const isDark = currentTheme === 'dark';
  const isLight = currentTheme === 'light';
  
  return {
    // Current theme state
    mode: theme.mode,
    currentTheme,
    isDark,
    isLight,
    
    // Colors
    colors: theme.colors[currentTheme],
    
    // Actions
    toggle: () => dispatch(toggleTheme()),
    setLight: () => dispatch(setLightTheme()),
    setDark: () => dispatch(setDarkTheme()),
    setSystem: () => dispatch(setSystemTheme()),
  };
};