import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  input,
  Input,
} from "@heroui/react";
import { useMemo, useState } from "react";
import { DeleteIcon } from "../general-Components/deleteIcon";
import { FaRoute } from "react-icons/fa6";
import useColumns from "./components/columns";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../general-Components/SearchIcon";

function Routes() {
  const { i18n, t } = useTranslation();
  const { columns, INITIAL_VISIBLE_COLUMNS } = useColumns();
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  return (
    <div className="max-w-full w-full ">
      <Card className="dark:bg-slate-900 w-full px-4 py-4">
        {/* // header components like action button columns filter and current page description */}
        <div className="w-full flex items-center justify-between gap-3 my-2">
          <div className="flex items-center justify-start gap-2">
            <FaRoute size={18} className="dark:text-white" />
            <h1 className="dark:text-white font-semibold">
              {t("routesPageValues.header")}
            </h1>
          </div>
          <div className="flex items-center justify-end gap-4">
            <div>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    color="danger"
                    endContent={<DeleteIcon className="text-small" />}
                    variant="bordered"
                  >
                    {t("routesPageValues.columns")}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem
                      key={column.uid}
                      className="capitalize"
                      variant="bordered"
                      color="danger"
                    >
                      {column.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Button
                color="primary"
                className="text-white hover:tracking-wider w-[120px] !transition-all !duration-300"
              >
                {t("routesPageValues.createRoute")}
              </Button>
            </div>
          </div>
        </div>
        {/* filters and search area */}
        <div className="flex items-center w-full">
          <div className="w-[100%] md:w-[50%] lg:w-[30%]">
            <Input
              isClearable
              radius="sm"
              className="w-full dark:text-white py-1"
              classNames={{ inputWrapper: ["py-2"] }}
              // label={t("routesPageValues.search")}
              placeholder={t("routesPageValues.searchPlaceholder")}
              type="text"
              variant="bordered"
              color="danger"
              onClear={() => console.log("input cleared")}
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Routes;
