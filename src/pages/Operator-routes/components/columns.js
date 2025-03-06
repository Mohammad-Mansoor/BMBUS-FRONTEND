import { useTranslation } from "react-i18next";

const useColumns = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  // Define the columns
  const columns = [
    {
      name: language === "ps" ? "نوم" : language === "fa" ? "نام" : "NAME",
      uid: "name",
      sortable: true,
    },
    {
      name: language === "ps" ? "رول" : language === "fa" ? "نقش" : "ROLE",
      uid: "role",
      sortable: true,
    },
    {
      name: language === "ps" ? "حالت" : language === "fa" ? "حالت" : "STATUS",
      uid: "status",
      sortable: true,
    },
    {
      name:
        language === "ps" ? "کړنې" : language === "fa" ? "اعمال" : "ACTIONS",
      uid: "actions",
    },
  ];

  // Define the initial visible columns
  const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

  // Return both columns and INITIAL_VISIBLE_COLUMNS as an object
  return { columns, INITIAL_VISIBLE_COLUMNS };
};

export default useColumns;
