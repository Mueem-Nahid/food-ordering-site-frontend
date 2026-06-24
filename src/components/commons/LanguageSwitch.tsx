import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
}

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>(i18n.language || "en");

  const languages: Language[] = [
    { code: "en", name: "English" },
    { code: "ur-PK", name: "اردو" },
    { code: "fi", name: "Suomi" },
  ];

  useEffect(() => {
    const stored = cookies.get("i18next") || "en";
    if (stored && stored !== currentLang) {
      i18n.changeLanguage(stored);
      setCurrentLang(stored);
    }
    //eslint-disable-next-line
  }, []);

  const handleChange = (lang: Language) => {
    cookies.set("i18next", lang.code, { expires: 365 });
    i18n.changeLanguage(lang.code);
    setCurrentLang(lang.code);
  };

  return (
    <div className="language-switcher">
      {languages.map((lang) => {
        return (
          <div
            key={lang.code}
            onClick={() => handleChange(lang)}
            className={`switch-${lang.code} ${
              currentLang === lang.code ? "switch-active" : ""
            }`}
          >
            <span>{lang.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
