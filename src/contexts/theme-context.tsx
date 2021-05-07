import React, {createContext, useState} from 'react';
import {ThemeType} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {Appearance} from 'react-native';

interface ThemeContextState {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextState>({
  theme: eva.light,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const userPrefersDarkMode = Appearance.getColorScheme() === 'dark';
  const [theme, setTheme] = useState<ThemeType>(
    userPrefersDarkMode ? eva.dark : eva.light,
  );

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleTheme: () => {
          if (theme === eva.light) {
            setTheme(eva.dark);
          } else {
            setTheme(eva.light);
          }
        },
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export {ThemeContext};
