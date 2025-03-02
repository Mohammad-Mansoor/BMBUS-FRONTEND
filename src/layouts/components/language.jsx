import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Image,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx"; // Helps conditionally apply classes

// Language options
const languages = [
  {
    code: "ps",
    label: "پښتو",
    flag: "https://flagcdn.com/w40/af.png",
    dir: "rtl",
  },
  {
    code: "fa",
    label: "دری",
    flag: "https://flagcdn.com/w40/af.png",
    dir: "rtl",
  },
  {
    code: "en",
    label: "English",
    flag: "https://flagcdn.com/w40/us.png",
    dir: "ltr",
  },
];

function Language() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    () => languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  // Function to handle language change and update direction
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.setAttribute("dir", lang.dir);
    setCurrentLang(lang);
  };

  // Apply the correct text alignment when the page loads
  useEffect(() => {
    document.documentElement.setAttribute("dir", currentLang.dir);
  }, [currentLang]);

  return (
    <div className="relative">
      <Dropdown>
        <DropdownTrigger>
          <Button className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 hover:bg-gray-700 transition text-white">
            <div className="flex items-center gap-2">
              <Image
                src={currentLang.flag}
                width={24}
                height={24}
                alt="language"
                className="rounded-full"
              />
              <span>{currentLang.label}</span>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Select Language"
          color="danger"
          variant="solid"
        >
          {languages.map((lang) => (
            <DropdownItem
              key={lang.code}
              onPress={() => handleLanguageChange(lang)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 transition rounded-lg",
                i18n.language === lang.code
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-100"
              )}
            >
              <div className="flex items-center justify-start gap-3">
                <Image
                  src={lang.flag}
                  width={24}
                  height={24}
                  alt={lang.label}
                  className="rounded-full"
                />
                <span>{lang.label}</span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Language;
