"use client";

import * as React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Edit2, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateRange } from "@/lib/formatDateRange";
import Link from "next/link";

// Define types for the data
type CouponData = {
  _id: string;
  couponCode: string;
  discountType: string;
  discountValue: number;
  minimumPurchase: number;
  startDate: string;
  endDate: string;
  status: string;
};

// Define columns using strong typing
export const CouponColumnstable: ColumnDef<CouponData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<CouponData> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "discountValue",
    header: () => <div className="text-center ">Discount</div>,
    cell: ({ row }) => {
      const discountValue = row.getValue<number>("discountValue");
      return <div className="text-center font-medium">{discountValue}%</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-center ">Validity Range</div>,
    cell: ({ row }) => {
      const startDate = row.getValue<string>("startDate");
      const endDate = row.original.endDate;

      return <div>{formatDateRange(startDate, endDate)}</div>;
    },
  },
  {
    accessorKey: "couponCode",
    header: ({ column }) => <div className=" text-center">Codes</div>,
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue<string>("couponCode")}</div>
    ),
  },
  {
    accessorKey: "validForCountry",
    header: "Valid On Products",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue<string>("validForCountry")}
      </div>
    ),
  },
  {
    accessorKey: "useType",
    header: "Use Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue<string>("useType")}</div>
    ),
  },
  {
    accessorKey: "minimumPurchase",
    header: () => <div className="text-center">Min Purchase</div>,
    cell: ({ row }) => {
      const minimumPurchase = row.getValue<number>("minimumPurchase");
      return <div className="text-center font-medium">${minimumPurchase}</div>;
    },
  },
  // Column definition using the formatDateRange function

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status").toLocaleLowerCase();

      // Define dynamic color mapping based on status
      const statusColors: any = {
        active: "bg-green-500 text-block",
        inactive: "bg-gray-500 text-block",
        pending: "bg-yellow-500 text-white",
        expired: "bg-red-500 text-white",
      };

      // Determine the color to apply based on status
      const statusColor = statusColors[status] || "bg-blue-500 text-white"; // Fallback for unknown status

      return (
        <div
          className={`capitalize flex items-center border ${statusColor} px-2 py-1 gap-2 rounded-full`}
        >
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="white" />
          </svg>
          {/* Capitalize first letter of the status */}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const coupon = row.original;

      return (
        <div className="flex items-center gap-2 space-x-2">
          {/* View Button */}
          <button
            className="w-5"
            onClick={() => {
              // Implement view logic here
              console.log("Viewing coupon:", coupon._id);
            }}
          >
            <Eye size={20} />
          </button>

          {/* Edit Button */}
          <Link
            href={`/coupon/edit/${coupon._id}`}
            onClick={() => {
              // Implement edit logic here
              console.log("Editing coupon:", coupon._id);
            }}
          >
            <Edit2 size={20} />
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => {
              // Implement delete logic here
              console.log("Deleting coupon:", coupon._id);
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      );
    },
  },
];
