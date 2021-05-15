import React, {createContext, useState} from 'react';
import {ThemeType} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {Appearance} from 'react-native';
import {themes} from '../themes/themes';


interface ThemeContextState {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextState>({
  theme: themes.light,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const userPrefersDarkMode = Appearance.getColorScheme() === 'light';
  const [theme, setTheme] = useState<ThemeType>(
    userPrefersDarkMode ? themes.dark : themes.light,
  );

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleTheme: () => {
          if (theme === themes.light) {
            setTheme(themes.dark);
          } else {
            setTheme(themes.light);
          }
        },
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export {ThemeContext};
