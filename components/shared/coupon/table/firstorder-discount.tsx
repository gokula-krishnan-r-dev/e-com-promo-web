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
import Loading from "@/components/ui/loading";

export function FirstOrderDiscount({ data, columns }: any) {
  const {
    setSelectedRow,
    setRowSelection,
    rowSelection,
    selectedRow,
    setLimit,
    setPage,
    limit,
    page,
    totalPages,
    isLoading,
  } = useDiscountContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  console.log(data, "data");

  const table = useReactTable({
    data: data || [],
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
    if (rowSelection) {
      const selectedRow = table?.getSelectedRowModel()?.rows;

      const ids = selectedRow.map((row: any) => row.original._id);
      setSelectedRow(ids);
    }
  }, [rowSelection]); // Only re-run when `table` changes (i.e., when the table is fully initialized)

  // React.useEffect(() => {
  //   const selectedRowModel = table.getSelectedRowModel();

  //   // Check if selectedRowModel and rows exist before proceeding
  //   if (selectedRowModel?.rows?.length) {
  //     const newSelectedIds = selectedRowModel.rows
  //       .map((row: any) => row.original?._id)
  //       .filter(Boolean);

  //     console.log(newSelectedIds, "selectedRowsArray");
  //     setSelectedRow(new Set(newSelectedIds));
  //   } else {
  //     // If no rows are selected or if selectedRowModel is undefined, reset selected rows state
  //     setSelectedRow([]);
  //   }
  // }, [table?.getSelectedRowModel()?.rows]);

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

  if (isLoading) {
    return <Loading />;
  }

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
