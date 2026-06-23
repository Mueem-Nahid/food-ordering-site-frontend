import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
}

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>(i18n.language || "en");

  const languages: Language[] = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "ur-PK", name: "اردو", dir: "rtl" },
  ];

  const applyDir = (lang: Language) => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = lang.code;
    }
  };

  useEffect(() => {
    const stored = cookies.get("i18next") || "en";
    const matched = languages.find((l) => l.code === stored);
    if (matched) {
      setCurrentLang(matched.code);
      applyDir(matched);
    }
    //eslint-disable-next-line
  }, []);

  const handleChange = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    setCurrentLang(lang.code);
    applyDir(lang);
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
