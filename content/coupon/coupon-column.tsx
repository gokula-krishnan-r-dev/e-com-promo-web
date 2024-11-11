"use client";

import * as React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { formatDateRange } from "@/lib/formatDateRange";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { isBefore, parseISO } from "date-fns";
import { toast } from "sonner";
import { transformText } from "@/components/shared/coupon/view-coupon";
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

const accessorFn = (row: any): string => {
  const isFlat = row.discountType === "FLAT";
  const prefix = isFlat ? "$" : "";
  const suffix = isFlat ? "" : "%";

  return `${prefix}${row.discountValue} ${suffix}`;
};

// Define columns using strong typing
export const CouponColumnstable: ColumnDef<CouponData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
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
    // i want to add multiple accessorskey discountValue and discountType
    accessorKey: "discountValue",
    accessorFn,
    header: () => <div className="text-center ">Discount</div>,
    cell: ({ row }) => {
      const discountValue = row.getValue<number>("discountValue");
      const discountType = row.getValue<string>("discountType");
      return <div className="text-center font-medium">{discountValue}</div>;
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
    header: () => <div className="text-center">Country</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {transformText(row.getValue<string>("validForCountry"))}
      </div>
    ),
  },
  {
    accessorKey: "useType",

    header: () => <div className="text-center">Use Type</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {transformText(row.getValue<string>("useType"))}
      </div>
    ),
  },
  {
    accessorKey: "useCount",
    header: () => <div className="text-center">Used Count</div>,
    cell: ({ row }) => {
      const useCount = row.getValue<number>("useCount") || 0;
      return <div className="text-center font-medium">{useCount}</div>;
    },
  },
  // {
  //   accessorKey: "minimumPurchase",
  //   header: () => <div className="text-center">Min Purchase</div>,
  //   cell: ({ row }) => {
  //     const minimumPurchase = row.getValue<number>("minimumPurchase");
  //     return <div className="text-center font-medium">${minimumPurchase}</div>;
  //   },
  // },
  // Column definition using the formatDateRange function
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const endDate = row.original?.endDate
        ? parseISO(row.original.endDate)
        : null;
      const currentDate = new Date();

      // Determine if the row is inactive based on date comparison
      const isInactive = endDate && isBefore(endDate, currentDate);
      const status = isInactive ? "Inactive" : row.getValue<string>("status");

      // Determine the color to apply based on status
      const statusColor = status === "ACTIVE" ? "green" : "red";

      return (
        <div
          className={`capitalize bg-white flex items-center border px-2 py-1 gap-2 rounded-full`}
        >
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill={statusColor} />
          </svg>
          {/* Capitalize first letter of the status */}

          {status.charAt(0).toUpperCase() + status.slice(1).toLocaleLowerCase()}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const coupon: any = row.original;
      const generateCouponEditUrl = (coupon: any) => {
        let idValue = "";

        // Set the idValue based on the couponType
        switch (coupon.couponType) {
          case "GENERAL":
            idValue = "general";
            break;
          case "BIRTHDAY":
            idValue = "birthday";
            break;
          case "ANNIVERSARY":
            idValue = "anniversary";
            break;
          default:
            idValue = ""; // Default value if none matches
            break;
        }

        // Construct the URL
        return `/coupon/edit/${coupon._id}?id=${idValue}`;
      };
      const couponEditUrl = generateCouponEditUrl(coupon);
      return (
        <div className="flex items-center justify-center gap-2 space-x-2">
          {/* View Button */}
          <Link
            href={"/coupon/view/" + coupon._id}
            className="w-5"
            onClick={() => {
              // Implement view logic here
              console.log("Viewing coupon:", coupon._id);
            }}
          >
            <Eye size={20} />
          </Link>

          {/* Edit Button */}
          <Link
            href={couponEditUrl}
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
              handleToDeleteSelectedRow(coupon._id);
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      );
    },
  },
];
const handleToDeleteSelectedRow = async (id: string) => {
  // Use Promise.all to handle multiple deletions concurrently
  if (!confirm("Are you sure you want to delete this coupon?")) {
    return;
  }

  if (!id) {
    toast.error("No coupon selected");
  }
  toast.info("Deleting selected Discount...");

  const response = await fetch(
    `https://e-com-promo-api-57xi.vercel.app/api/v1/coupons/${id}`,
    {
      method: "DELETE",
    }
  );

  // Check for errors
  if (!response.ok) {
    const error = await response.json();
    toast.error(error.message);
  }

  const data = await response.json();

  toast.success(data.message || "Successfully deleted");
  window.location.reload();
};
