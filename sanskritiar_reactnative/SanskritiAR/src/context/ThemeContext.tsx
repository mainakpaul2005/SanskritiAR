import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  isDark: boolean;
}

interface ThemeContextType extends ThemeState {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_SYSTEM_THEME'; payload: boolean };

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      const isDark = action.payload === 'dark' || 
        (action.payload === 'system' && Appearance.getColorScheme() === 'dark');
      return { theme: action.payload, isDark };
    case 'SET_SYSTEM_THEME':
      return { ...state, isDark: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'dark', // Default to dark mode for modern UI
    isDark: true,
  });

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          dispatch({ type: 'SET_THEME', payload: savedTheme as Theme });
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (state.theme === 'system') {
        dispatch({ type: 'SET_SYSTEM_THEME', payload: colorScheme === 'dark' });
      }
    });

    return () => subscription?.remove();
  }, [state.theme]);

  const setTheme = async (theme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', theme);
      dispatch({ type: 'SET_THEME', payload: theme });
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = state.isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ ...state, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};