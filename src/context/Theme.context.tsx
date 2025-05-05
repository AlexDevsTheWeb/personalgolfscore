import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

// Create the context with a default value (optional, but good practice)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize state, potentially reading from localStorage or system preference
  const [mode, setMode] = useState<ThemeMode>('dark'); // Default to light

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    // Optionally, save the preference to localStorage here
  };

  // useMemo prevents unnecessary re-renders of consumers
  // when the provider's parent re-renders
  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context easily
export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};