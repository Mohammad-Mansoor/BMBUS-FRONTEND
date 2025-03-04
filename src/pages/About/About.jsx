import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Spinner,
  Card,
  Pagination,
  Input,
} from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { EditIcon } from "../general-Components/EditIcon";
import { DeleteIcon } from "../general-Components/deleteIcon";
import { EyeIcon } from "../general-Components/ViewIcon";
import NoData from "../general-Components/NoData";
import { users } from "../../data/user-dummy-data";
import { columns, statusColorMap } from "../../data/table-dummy-data";

export default function About() {
  const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];
  const [isLoading, setIsLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "asc",
  });

  const sortedItems = React.useMemo(() => {
    return [...users].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      // Use "asc"/"desc" instead of "ascending"/"descending"
      return sortDescriptor.direction === "desc" ? cmp : -cmp;
    });
  }, [sortDescriptor, users]);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Card className="bg-white dark:bg-slate-800 overflow-hidden">
      <div className="w-full py-4 px-4">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          // startContent={<SearchIcon />}
          // value={filterValue}
          // onClear={() => onClear()}
          // onValueChange={onSearchChange}
        />
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button
              endContent={<DeleteIcon className="text-small" />}
              variant="flat"
            >
              Columns
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
              <DropdownItem key={column.uid} className="capitalize">
                {column.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className=" ">
        <Table
          aria-label="Sortable table"
          // className="min-w-full w-full overflow-x-auto "
          onSortChange={(descriptor) => {
            console.log("Sort changed:", descriptor);
            if (descriptor?.direction === "ascending") {
              setSortDescriptor({
                column: descriptor.column,
                direction: "desc",
              });
            } else {
              setSortDescriptor({
                column: descriptor.column,
                direction: "acs",
              });
            }
          }}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={<NoData />}
            items={sortedItems}
            isLoading={isLoading}
            loadingContent={
              <div className="h-full w-full flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
                <Spinner variant="spinner" color="danger" label="Loading..." />
              </div>
            }
            className="bg-white dark:bg-red-500"
          >
            {(item) => (
              <TableRow key={item.id} className="bg-white dark:bg-slate-700">
                {(columnKey) => (
                  <TableCell className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4 px-4">
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="capitalize"
                color={"danger"}
                variant={"bordered"}
              >
                {10}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown Variants"
              color={"danger"}
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
            color="danger"
          />
        </div>
      </div>
    </Card>
  );
}
