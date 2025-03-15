import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { myFilter } from "../../utils/myFilterFunctionForAutomcomplete";
import TableDesign from "./components/Table";
import { PlusIcon } from "../general-Components/plusIcon";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getProvinces,
  getRoutes,
} from "../../services/operator-routes-service";

function Routes() {
  const { i18n, t } = useTranslation();
  const status = [
    { label: i18n.language == "en" ? "Active" : "فعال", value: "active" },
    {
      label: i18n.language == "en" ? "Inactive" : "غیر فعال",
      value: "deactive",
    },
  ];

  const [filters, setFilters] = useState({
    limit: 20,
    page: 1,
    province_id: "",
    route_name: "",
    search: "",
  });
  const { columns, INITIAL_VISIBLE_COLUMNS } = useColumns();
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [totalRecords, setTotalRecords] = useState(0);

  // const { provinces } = useProvinces();
  const navigate = useNavigate();
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column, i) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, i18n.language]);
  const handleFilterChange = (field, value) => {
    if (field == "page") {
      setFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [field]: value,
        page: 1,
      }));
    }
  };
  const { isLoading, data, error } = useQuery({
    queryKey: ["routes", filters, i18n.language],
    queryFn: () => getRoutes(filters),
  });

  const { data: provinces } = useQuery({
    queryKey: ["provinces", i18n.language],
    queryFn: getProvinces,
  });

  console.log(data, "this si routes");
  console.log(filters, "these are filters value");

  return (
    <div className="max-w-full w-full max-h-[92vh] h-full overflow-y-auto bg-gray-50 dark:bg-slate-800 rounded-md py-10 px-1 md:px-5   ">
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
                onPress={() => navigate("/operator-routes/create-route/null")}
                endContent={
                  <div>
                    <PlusIcon />
                  </div>
                }
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
          <div className="flex justify-start w-[100%] md:w-[40%] lg:w-[30%] ">
            <Input
              isClearable
              radius="sm"
              className="w-full dark:text-white !h-[40px] "
              onChange={(e) => {
                if (e.target.value == "") {
                  handleFilterChange("search", "");
                } else {
                  const handler = setTimeout(() => {
                    handleFilterChange("search", e.target.value);
                  }, 500);

                  return () => {
                    clearTimeout(handler);
                  };
                }
              }}
              placeholder={t("routesPageValues.searchPlaceholder")}
              type="text"
              variant="bordered"
              color="danger"
              onClear={() => {
                handleFilterChange("search", "");
              }}
              startContent={
                <SearchIcon className="text-black/50  dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>

          <div className="flex items-center justify-end gap-4 w-[100%] md:w-[60%] lg:w-[70%]">
            <div className=" flex justify-start ">
              <Autocomplete
                allowsCustomValue
                aria-label="provinces"
                className="!w-full !label:text-gray-300 !h-[40px] max-w-xs !focus:border !focus:border-danger-600"
                defaultFilter={myFilter}
                defaultItems={provinces || []}
                radius="sm"
                placeholder={t("routesPageValues.filterByProvince")}
                variant="bordered"
                color="danger"
                onSelectionChange={(key) => {
                  if (key == null) {
                    handleFilterChange("province_id", "");
                  } else {
                    handleFilterChange("province_id", key);
                  }
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    className="!w-full"
                    key={item?.id}
                    variant="bordered"
                    color="danger"
                  >
                    {item?.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            <div className=" flex justify-start ">
              <Autocomplete
                allowsCustomValue
                className=" w-full  !label:text-gray-300 !h-[40px] max-w-xs !focus:border !focus:border-danger-600"
                defaultFilter={myFilter}
                defaultItems={status}
                items={status}
                radius="sm"
                placeholder={t("routesPageValues.status_filter")}
                variant="bordered"
                color="danger"
                onSelectionChange={(key) => {
                  if (key == null) {
                    handleFilterChange("status", "");
                  } else {
                    handleFilterChange("status", key);
                  }
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    aria-label="status"
                    className="!w-full"
                    key={item.value}
                    variant="bordered"
                    color="danger"
                  >
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </div>
        </div>
      </Card>
      <Card className="w-full   mt-4">
        <TableDesign
          setTotalRecords={setTotalRecords}
          headerColumns={headerColumns}
          routes={data?.data || []}
          isLoading={isLoading}
        />

        <div className="flex items-center justify-between py-4 px-4">
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="capitalize"
                  color={"primary"}
                  variant={"bordered"}
                >
                  {filters.limit}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  handleFilterChange("limit", key);
                }}
                value={filters.limit}
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
              page={filters.page}
              isCompact
              showControls
              initialPage={1}
              total={data?.pagination?.total_pages}
              color="primary"
              variant="shadow"
              onChange={(value) => {
                handleFilterChange("page", value);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Routes;
