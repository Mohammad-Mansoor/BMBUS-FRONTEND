import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@heroui/react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { routes } from "../../../data/routes-dummy-data";
import { Accordion, AccordionItem } from "@heroui/react";

// Custom accessor function for nested properties
const getNestedValue = (item, columnKey) => {
  return columnKey.split(".").reduce((obj, key) => (obj || {})[key], item);
};

export default function TableDesign({ setTotalRecords }) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState(routes);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name", // Changed to valid column key
    direction: "ascending",
  });

  useEffect(() => {
    setTotalRecords(routes.length);
  });
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = getNestedValue(a, sortDescriptor.column);
      const second = getNestedValue(b, sortDescriptor.column);

      // Handle numeric comparison for distance/coordinates
      if (
        sortDescriptor.column.includes("distance") ||
        sortDescriptor.column.includes("km")
      ) {
        return sortDescriptor.direction === "ascending"
          ? first - second
          : second - first;
      }

      // Default string comparison
      const cmp = String(first ?? "").localeCompare(String(second ?? ""));
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
  }, [items, sortDescriptor]);

  const handleSortChange = (newDescriptor) => {
    setSortDescriptor(newDescriptor);
  };

  return (
    <Table
      aria-label="Routes table"
      classNames={{
        table: "min-h-[400px]",
        tr: "hover:bg-primary-100 transition-colors duration-200 cursor-pointer",
      }}
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortChange}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          Route Name
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          Status
        </TableColumn>
        <TableColumn key="total_distance_km" allowsSorting>
          Distance (km)
        </TableColumn>
        <TableColumn key="origin.name" allowsSorting>
          Origin
        </TableColumn>
        <TableColumn key="destination.name" allowsSorting>
          Destination
        </TableColumn>
        <TableColumn key="stops.length" allowsSorting>
          Stops Count
        </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={sortedItems}
        loadingContent={
          <div className="h-[80%] mt-10 w-full flex items-center justify-center backdrop-blur-sm z-50">
            <Spinner variant="spinner" color="danger" label="Loading..." />
          </div>
        }
      >
        {(item) => (
          <TableRow
            key={`${item.id}-${item.name}`}
            className="!hover:bg-gray-300"
          >
            {(columnKey) => {
              const value = getNestedValue(item, columnKey);

              // Format specific values
              if (columnKey === "total_distance_km") {
                return <TableCell>{value} km</TableCell>;
              }
              if (columnKey === "stops.length") {
                return <TableCell>{value} stops</TableCell>;
              }

              return <TableCell>{value}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
