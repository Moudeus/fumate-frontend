import { createContext, useState, useEffect, ReactNode } from 'react';
import { theme as defaultTheme } from '../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: typeof defaultTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    // Update CSS variables and body background based on theme mode
    const root = document.documentElement;
    const body = document.body;
    
    if (mode === 'dark') {
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.2)');
      root.style.setProperty('--text-color', '#ffffff');
      body.style.background = defaultTheme.backgrounds.dark.primary;
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center';
      body.style.backgroundRepeat = 'no-repeat';
    } else {
      root.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.2)');
      root.style.setProperty('--text-color', '#000000');
      body.style.background = defaultTheme.backgrounds.light.primary;
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center';
      body.style.backgroundRepeat = 'no-repeat';
    }
    
    body.style.backgroundAttachment = 'fixed';
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme: defaultTheme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
