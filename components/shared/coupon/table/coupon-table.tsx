"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isBefore, parseISO } from "date-fns";

import { CouponColumnstable } from "@/content/coupon/coupon-column";
import { useCouponContext } from "@/components/hook/CouponContext";
import { cn } from "@/lib/utils";

export function CouponTable({ data, filter, columns }: any) {
  const {
    setFilters,
    filtersC,
    rowSelection,
    setRowSelection,
    setSelectedRow,
  } = useCouponContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  React.useEffect(() => {
    setFilters({
      ...filtersC,
      filter: filter,
    });
  }, [filter]);

  const table = useReactTable({
    data,
    columns: columns || CouponColumnstable,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    const selectedRowsArray: any = table?.getSelectedRowModel().rows;

    if (selectedRowsArray && selectedRowsArray.length > 0) {
      // Loop through selected rows and get their MongoDB `_id` fields
      const newSelectedIds = selectedRowsArray
        .map((row: any) => row.original?._id)
        .filter(Boolean);

      // Update selected rows list, adding or removing IDs to maintain uniqueness
      setSelectedRow(new Set(newSelectedIds));
    } else {
      // If no rows are selected, reset the selected rows state
      setSelectedRow([]);
    }
  }, [table?.getSelectedRowModel().rows]);

  return (
    <div className="w-full">
      <div className="rounded-xl border border-[#EAECF0]">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-[#4A5367] bg-[#F9FAFB] font-semibold"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-center">
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => {
                // Extract startDate and endDate from the row data
                const endDate = row.original?.endDate
                  ? parseISO(row.original.endDate)
                  : null;
                const currentDate = new Date();

                // Determine if the row is inactive based on date comparison
                const isInactive = endDate && isBefore(endDate, currentDate);

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      isInactive ? "bg-gray-100 cursor-not-allowed" : "", // Apply bg-gray-100 if inactive
                      row.getIsSelected() ? "selected-row-class" : "" // Apply selected class if row is selected
                    )}
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <TableCell className={cn("text-[#4A5367]")} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    {/* Conditionally render "Inactive" if the coupon has expired
                    {isInactive && (
                      <TableCell className="text-red-500 font-semibold">
                        Inactive
                      </TableCell>
                    )} */}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={CouponColumnstable.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between w-full  space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length}
        </div>
      </div>
    </div>
  );
}
