import { useTranslation } from "react-i18next";

const useColumns = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  // Define the columns
  const columns = [
    {
      name:
        language === "ps"
          ? "د لارې نوم"
          : language === "fa"
          ? "نام مسیر"
          : "Route Name",
      uid: "name",
      sortable: true,
    },
    {
      name: language === "ps" ? "مبدأ" : language === "fa" ? "مبدأ" : "Origin",
      uid: "origin.name",
      sortable: true,
    },
    {
      name:
        language === "ps" ? "منزل" : language === "fa" ? "مقصد" : "Distination",
      uid: "destination.name",
      sortable: true,
    },
    {
      name:
        language === "ps"
          ? "واټن (کیلومتر)"
          : language === "fa"
          ? "فاصله (کیلومتر)"
          : "Distance (km)",
      uid: "total_distance_km",
      sortable: true,
    },
    {
      name: language === "ps" ? "حالت" : language === "fa" ? "وضعیت" : "status",
      uid: "status",
      sortable: true,
    },
    {
      name:
        language === "ps" ? "	تمځي" : language === "fa" ? "توقفگاه‌ها" : "Stops",
      uid: "stops.length",
      sortable: true,
    },
    {
      name:
        language === "ps"
          ? "	د جوړیدو نیټه"
          : language === "fa"
          ? "تاریخ ایجاد"
          : "Created At",
      uid: "createdAt",
      sortable: true,
    },
    {
      name:
        language === "ps"
          ? "د نوي کیدو نیټه"
          : language === "fa"
          ? "تاریخ بروزرسانی"
          : "Updated At",
      uid: "updatedAt",
      sortable: true,
    },
    {
      name:
        language === "ps" ? "کړنې" : language === "fa" ? "اعمال" : "ACTIONS",
      uid: "actions",
    },
  ];

  // Define the initial visible columns
  const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "origin.name",
    "destination.name",
    "total_distance_km",
    "status",
    "stops.length",
    "actions",
  ];

  // Return both columns and INITIAL_VISIBLE_COLUMNS as an object
  return { columns, INITIAL_VISIBLE_COLUMNS };
};

export default useColumns;
