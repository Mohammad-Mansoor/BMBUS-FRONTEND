import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  input,
  Input,
  Pagination,
} from "@heroui/react";
import { useMemo, useState } from "react";
import { DeleteIcon } from "../general-Components/deleteIcon";
import { FaRoute } from "react-icons/fa6";
import useColumns from "./components/columns";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../general-Components/SearchIcon";
import useProvinces from "../../data/provincess";
import { Autocomplete, AutocompleteItem, Avatar } from "@heroui/react";
import { myFilter } from "../../utils/myFilterFunctionForAutomcomplete";
import TableDesign from "./components/Table";

function Routes() {
  const { i18n, t } = useTranslation();
  const { columns, INITIAL_VISIBLE_COLUMNS } = useColumns();
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedProvince, setSelectedProvince] = useState("");
  const { provinces } = useProvinces();
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  return (
    <div className="max-w-full w-full max-h-full h-full bg-gray-50 dark:bg-slate-800 rounded-md py-10 px-1 md:px-5   ">
      <Card className=" w-full py-1 px-3 ">
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
                endContent={"+"}
                color="primary"
                className="text-white hover:tracking-wider w-[120px] !transition-all !duration-300"
              >
                {t("routesPageValues.createRoute")}
              </Button>
            </div>
          </div>
        </div>
        {/* filters and search area */}
        <div className="flex items-center justify-between w-full gap-4 py-3">
          <div className="w-full flex items-center justify-start gap-2 ">
            <div className="w-[100%] md:w-[50%] lg:w-[30%] flex justify-start ">
              <Input
                isClearable
                radius="sm"
                className="w-full dark:text-white !h-[40px] "
                // classNames={{ inputWrapper: "" }}
                // label={t("routesPageValues.search")}
                placeholder={t("routesPageValues.searchPlaceholder")}
                type="text"
                variant="bordered"
                color="danger"
                onClear={() => console.log("input cleared")}
                startContent={
                  <SearchIcon className="text-black/50  dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <div className="w-[100%] md:w-[50%] lg:w-[30%] flex justify-start ">
              <Autocomplete
                allowsCustomValue
                className="!w-full !label:text-gray-300 !h-[40px] max-w-xs !focus:border !focus:border-danger-600"
                defaultFilter={myFilter}
                defaultItems={provinces}
                radius="sm"
                // label="Filter By Province"
                placeholder="Filter By Province"
                variant="bordered"
                color="danger"
              >
                {(item) => (
                  <AutocompleteItem
                    className="!w-full"
                    key={item?.name}
                    variant="bordered"
                    color="danger"
                  >
                    {item?.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </div>
          <div className="w-[200px] md:flex items-center justify-end hidden">
            {i18n.language == "en" ? (
              <h1 className="text-gray-400">total Records: {totalRecords}</h1>
            ) : (
              <h1 className="text-gray-400">ټول ریکارډونه: {totalRecords}</h1>
            )}
          </div>
        </div>
      </Card>
      <Card className="w-full   mt-4">
        <TableDesign setTotalRecords={setTotalRecords} />

        <div className="flex items-center justify-between py-4 px-4">
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="capitalize"
                  color={"primary"}
                  variant={"bordered"}
                >
                  {10}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown Variants"
                color={"primary"}
                variant={"bordered"}
              >
                <DropdownItem className="text-center" key="10">
                  10
                </DropdownItem>
                <DropdownItem className="text-center" key="20">
                  20
                </DropdownItem>
                <DropdownItem className="text-center" key="50">
                  50
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <Pagination
              isCompact
              showControls
              initialPage={1}
              total={10}
              color="primary"
              variant="shadow"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Routes;
