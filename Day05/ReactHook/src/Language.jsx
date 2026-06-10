import { useLanguage, useTheme } from "./hooks/LanguageContext";

const translations = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour",
};

function Language() {
  const { language, changeLanguage } = useLanguage();
  const { theme, changeTheme } = useTheme();
  return (
    <>
      <h3>React Context API</h3>

      <label htmlFor="language-select">Choose a language</label>

      <select
        id="language-select"
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#000" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          padding: "20px",
        }}
      ></div>
      <p>{translations[language]}</p>

      <label htmlFor="theme-select">Choose a Theme</label>

      <select
        id="theme-select"
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
    </>
  );
}

export default Language;
