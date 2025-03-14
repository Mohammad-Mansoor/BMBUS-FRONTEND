import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Tooltip,
  Chip,
  useDisclosure,
  addToast,
  Card,
} from "@heroui/react";
import { routes } from "../../../data/routes-dummy-data";
import { EyeIcon } from "../../general-Components/ViewIcon";
import { EditIcon } from "../../general-Components/EditIcon";
import { DeleteIcon } from "../../general-Components/deleteIcon";
import { useTranslation } from "react-i18next";
import {
  deleteRoute,
  getRoutes,
} from "../../../services/operator-routes-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import ConfirmDeleteModal from "./confirmationModel";
import { useNavigate } from "react-router-dom";
import EmptyState from "./Norecords";

// Custom accessor function for nested properties
const getNestedValue = (item, columnKey) => {
  return columnKey.split(".").reduce((obj, key) => (obj || {})[key], item);
};

export default function TableDesign({
  setTotalRecords,
  headerColumns,
  routes,
  isLoading,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { i18n, t } = useTranslation();
  const [deletingRoute, setDeletingRoute] = useState(false);
  const [deleteRouteId, setDeleteRouteId] = useState("");
  const [deleteRouteName, setDeleteRouteName] = useState("");

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  useEffect(() => {
    setTotalRecords(routes.length);
  }, []);
  const navigate = useNavigate();
  // console.log("these are routes: ", data);
  const sortedItems = useMemo(() => {
    if (!routes) return []; // Ensure it's always an array
    return [...routes].sort((a, b) => {
      const first = getNestedValue(a, sortDescriptor.column);
      const second = getNestedValue(b, sortDescriptor.column);
      if (
        sortDescriptor.column.includes("distance") ||
        sortDescriptor.column.includes("km")
      ) {
        return sortDescriptor.direction === "ascending"
          ? first - second
          : second - first;
      }
      const cmp = String(first ?? "").localeCompare(String(second ?? ""));
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
  }, [routes, sortDescriptor]);

  const handleSortChange = (newDescriptor) => {
    setSortDescriptor(newDescriptor);
  };

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        deleteRouteId={deleteRouteId}
        setDeleteRouteId={setDeleteRouteId}
        deleteRouteName={deleteRouteName}
        setDeleteRouteName={setDeleteRouteName}
      />

      <Table
        aria-label="Routes table"
        classNames={{
          table: "min-h-[400px]",
          tr: "hover:bg-primary-50 transition-colors duration-200 cursor-pointer rounded-lg",
        }}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column?.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={<EmptyState />}
          isLoading={isLoading}
          items={sortedItems?.length > 0 ? sortedItems : []}
          loadingContent={
            <div className="h-[80%] mt-10 w-full flex items-center justify-center backdrop-blur-sm z-50">
              <Spinner variant="spinner" color="danger" label="Loading..." />
            </div>
          }
        >
          {(item) => (
            <TableRow key={`${item.id}-${item.name}`}>
              {(columnKey) => {
                const value = getNestedValue(item, columnKey);

                if (columnKey === "total_distance_km") {
                  return (
                    <TableCell>
                      {item.total_distance_km}{" "}
                      {i18n.language == "en" ? "KM" : "کیلومتر"}
                    </TableCell>
                  );
                }

                if (columnKey === "stops.length") {
                  return (
                    <TableCell>
                      {item.stops.length} {t("routesPageValues.table_stops")}
                    </TableCell>
                  );
                }
                if (columnKey === "status") {
                  return (
                    <TableCell>
                      <Chip
                        className="capitalize"
                        color={
                          item.status == "active"
                            ? "success"
                            : "inactive"
                            ? "danger"
                            : "danger"
                        }
                        size="md"
                        variant="flat"
                      >
                        {value}
                      </Chip>
                    </TableCell>
                  );
                }
                if (columnKey === "actions") {
                  return (
                    <TableCell>
                      <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content={t("routesPageValues.tooltipView")}>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon />
                          </span>
                        </Tooltip>
                        <Tooltip content={t("routesPageValues.tooltipEdit")}>
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                              navigate(
                                `/operator-routes/create-route/${item.id}`
                              );
                            }}
                          >
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip
                          color="danger"
                          content={t("routesPageValues.tooltipDelete")}
                        >
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => {
                              setDeleteRouteId(item?.id);
                              setDeleteRouteName(item?.name);
                              onOpen();
                            }}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  );
                }

                return <TableCell>{value}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
