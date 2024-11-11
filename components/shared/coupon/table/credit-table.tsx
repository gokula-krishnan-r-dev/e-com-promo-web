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
import { useCreditContext } from "@/components/hook/creditContext";
import { toast } from "sonner";
import { CreditColumnstable } from "@/content/credit/credit-content";
import { cn } from "@/lib/utils";
import { isBefore, parseISO } from "date-fns";

export function CreditTable({ data, pagination }: any) {
  const { setSelectedRow, setLimit, setPage, limit, page, totalPages } =
    useCreditContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Flatten the data for rendering
  const flatData = React.useMemo(() => {
    return data
      .map((user: any) =>
        user.creditId.map((credit: any) => ({
          _id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          creditId: credit?._id,
          creditAmount: credit?.creditAmount,
          startDate: credit?.startDate,
          endDate: credit?.endDate,
          status: credit?.status,
          usedAmount: credit?.usedAmount,
        }))
      )
      .flat();
  }, [data]);

  const table = useReactTable({
    data: flatData,
    columns: CreditColumnstable,
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
      console.log(selectedRow, "selectedRow");

      const ids = selectedRow.map((row: any) => row.original?._id);
      setSelectedRow(ids);
    }
  }, [rowSelection]); // Only re-run when `table` changes (i.e., when the table is fully initialized)

  const handleToPreviewPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.error("No more pages to load");
    }
  };

  const handleToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    } else {
      toast.error("No more pages to load");
    }
  };
  const displayedNames = new Set();
  return (
    <div className="w-full">
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="text-center">
            {table.getRowModel().rows.length ? (
              <>
                {/* Custom header for firstName */}
                {table.getRowModel().rows.map((row, index) => {
                  // Create a Set to keep track of displayed first names

                  // Check if the first name has already been displayed
                  const currentFirstName = flatData[index]?.firstName;
                  console.log(currentFirstName, "currentFirstName");

                  // Determine if we should display the current first name
                  const shouldDisplayFirstName =
                    !displayedNames.has(currentFirstName);

                  // If it should be displayed, add it to the Set
                  if (true) {
                    displayedNames.add(currentFirstName);
                  }

                  const endDate = row.original?.endDate
                    ? parseISO(row.original.endDate)
                    : null;
                  const currentDate = new Date();

                  // Determine if the row is inactive based on date comparison
                  const isInactive = endDate && isBefore(endDate, currentDate);
                  const ammount = row.original?.creditAmount;
                  // Determine the color to apply based on status
                  const usedAmount = row.original?.usedAmount;
                  const isActive = ammount <= usedAmount;
                  return (
                    <>
                      {shouldDisplayFirstName && (
                        <TableRow
                          key={`name-${index}`}
                          className="bg-[#EDEFF2]"
                        >
                          <TableCell
                            colSpan={CreditColumnstable.length}
                            className="text-sm pl-16 font-semibold text-[#4A5367] text-start"
                          >
                            {currentFirstName || "First Name"}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow
                        className={cn(
                          isInactive || isActive
                            ? "bg-gray-100 cursor-not-allowed"
                            : "", // Apply bg-gray-100 if inactive
                          row.getIsSelected() ? "selected-row-class" : "" // Apply selected class if row is selected
                        )}
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className="text-[#4A5367] text-sm"
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </>
                  );
                })}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={CreditColumnstable.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between w-full space-x-2 py-4">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleToPreviewPage}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleToNextPage}>
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
