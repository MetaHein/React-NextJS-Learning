/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, use, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const LanguageContext = createContext({
  language: "en",
  changeLanguage: () => null,
});
const ThemeContext = createContext({
  theme: "light",
  changeTheme: () => null,
});
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");
  const [theme, setTheme] = useState("dark");

  const changeLanguage = (lang) => setLanguage(lang);
  const changeTheme = (themeString) => setTheme(themeString);

  return (
    <LanguageContext value={{ language, changeLanguage, theme, changeTheme }}>
      {children}
    </LanguageContext>
  );
};

export const useLanguage = () => use(LanguageContext);
export const useTheme = () => use(ThemeContext);
