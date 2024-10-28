"use client";
import * as React from "react";
import {
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
import { CouponColumnstable } from "@/content/coupon/coupon-column";
import { cn } from "@/lib/utils";
import { isBefore, parseISO } from "date-fns";
import { useDiscountContext } from "@/components/hook/discountContext";
import { toast } from "sonner";

export function FirstOrderDiscount({ data, columns }: any) {
  const {
    setSelectedRow,
    setRowSelection,
    rowSelection,
    setLimit,
    setPage,
    limit,
    page,
    totalPages,
  } = useDiscountContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  console.log(data, "data");

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

    if (selectedRowsArray) {
      // Loop through selected rows and get their MongoDB `_id` fields
      const newSelectedIds = selectedRowsArray
        .map((row: any) => row.original?._id)
        .filter(Boolean);

      console.log(newSelectedIds, "selectedRowsArray");
      // Update selected rows list, adding or removing IDs to maintain uniqueness
      setSelectedRow(new Set(newSelectedIds));
    } else {
      // If no rows are selected, reset the selected rows state
      setSelectedRow([]);
    }
  }, [table?.getSelectedRowModel().rows]);

  const handltoPreviewPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.error("No more pages to load");
    }
  };

  const hanldeToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    } else {
      toast.error("No more pages to load");
    }
  };
  return (
    <div className="w-full">
      <div className="rounded-xl border">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-[#4A5367] font-semibold"
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
        <div className="space-x-2 ">
          <Button variant="outline" size="sm" onClick={handltoPreviewPage}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={hanldeToNextPage}>
            Next
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
      </div>
    </div>
  );
}
