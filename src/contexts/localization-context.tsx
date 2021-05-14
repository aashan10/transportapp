import React, {createContext, useState} from 'react';
import languages, {Language, english, nepali} from '../languages/language';

interface LocalizationContextState {
  currentLanguage: Language;
  setLanguage: (language: string) => void;
}

const LocalizationContext = createContext<LocalizationContextState>({
  currentLanguage: english,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLanguage: (lang: string) => {},
});

const LocalizationProvider = ({children}: {children: React.ReactNode}) => {
  const [language, setLanguage] = useState<Language>(nepali);

  return (
    <LocalizationContext.Provider
      value={{
        currentLanguage: language,
        setLanguage: (lang: string) => {
          if (Object.keys(languages).indexOf(lang) > -1) {
            // @ts-ignore
            setLanguage(languages[lang]);
          }
        },
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
export {LocalizationProvider};
