import { useTranslation } from "react-i18next";

const useProvinces = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  // Define the columns
  const provinces = [
    {
      name: language === "ps" ? "کابل" : language === "fa" ? "کابل" : "Kabul",
    },
    {
      name: language === "ps" ? "هرات" : language === "fa" ? "هرات" : "Herat",
      uid: "role",
      sortable: true,
    },
    {
      name:
        language === "ps"
          ? "قندهار"
          : language === "fa"
          ? "قندهار"
          : "Kandahar",
      uid: "role",
      sortable: true,
    },
  ];

  return { provinces };
};

export default useProvinces;
