import { useTranslation } from "react-i18next";

const LangChange = () => {
  const { i18n } = useTranslation();

  const languages = [
    {
      code: "en",
      name: "English",
      dir: "ltr",
      country_code: "gb",
    },
    {
      code: "spa",
      name: "Español",
      dir: "rtl",
      country_code: "sa",
    },
  ];

  const changeLanguageOnSelect = (lang) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <select
      id="country"
      name="country"
      value={i18n?.language}
      className="form-select"
      onChange={(e) => changeLanguageOnSelect(e.target.value)}
      style={{ color: "#012970", fontWeight: 600 }}
    >
      {languages.map((language) => (
        <option
          disabled={i18n?.language === language.code}
          key={language.code}
          value={language.code}
          style={{ color: "#012970", fontWeight: 600 }}
        >
          {language.name}
        </option>
      ))}
    </select>
  );
};
export default LangChange;
