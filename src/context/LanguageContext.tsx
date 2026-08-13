import React, { createContext, useContext, useState } from "react";

interface LanguageContextValue {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "cs",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState("cs");
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
