import { createContext, useState, useContext } from 'react';
import translations from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('language') || 'id');

  const t = (key) => translations[lang]?.[key] ?? translations['id'][key] ?? key;

  const changeLang = (code) => {
    setLang(code);
    localStorage.setItem('language', code);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
