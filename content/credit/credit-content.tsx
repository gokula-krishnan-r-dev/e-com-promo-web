"use client";
import Joi from "joi";
import { FormField } from "../coupon/gene-form";

import * as React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Edit2, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateRange } from "@/lib/formatDateRange";
import Link from "next/link";
import { toast } from "sonner";

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
export const creditFormFields: FormField[] = [
  {
    name: "creditAmount",
    type: "number",
    label: "Credit Amount",
    id: "creditAmount",
    placeholder: "Enter credit amount",
    required: true,
    validation: {
      pattern: /^[0-9]*\.?[0-9]+$/,
      errorMessage: "Credit amount must be a valid number.",
    },
  },
  {
    name: "startDate",
    type: "date",
    label: "Start Date",
    id: "startDate",
    placeholder: "Select start date",
    required: true,
    validation: {
      errorMessage: "Start date is required.",
    },
  },
  {
    name: "user",
    type: "radio",
    label: "User",
    id: "user",
    options: [
      { value: "ALL", label: "All" },
      { value: "SELECTED", label: "Selected" },
    ],
    required: true,
    validation: {
      errorMessage: "User is required.",
    },
  },
  {
    name: "status",
    type: "radio",
    label: "Status",
    id: "status",
    options: [
      { value: "ACTIVE", label: "Active" },
      { value: "INACTIVE", label: "Inactive" },
    ],
    required: true,
    validation: {
      errorMessage: "Status is required.",
    },
  },
  {
    name: "remarks",
    type: "text",
    label: "Remarks",
    id: "remarks",
    placeholder: "Enter remarks",
    required: false,
    validation: {
      minLength: 3,
      maxLength: 100,
      errorMessage: "Remarks must be between 3 and 100 characters.",
    },
  },
];

export const creditFormValidation = Joi.object({
  creditAmount: Joi.number().required().label("Credit Amount"),
  startDate: Joi.date().required().label("Start Date"),
  endDate: Joi.date().required().label("End Date"),
  user: Joi.string().required().label("User"),
  userIds: Joi.array().items(Joi.string()).label("User IDs"),
  status: Joi.string().required().label("Status"),
  remarks: Joi.string().required().min(3).max(100).label("Remarks"),
});

// Define columns using strong typing
export const CreditColumnstable: ColumnDef<any>[] = [
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
    cell: ({ row }: { row: Row<any> }) => (
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
    id: "creditAmount",
    accessorKey: "creditAmount",
    header: () => <div className="text-center ">Credit Amount</div>,
    cell: ({ row }) => {
      const creditAmount = row.getValue<number>("creditAmount");
      return <div className="text-center font-medium">${creditAmount}</div>;
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
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
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
        <div className="gap-2 flex items-center justify-center space-x-2">
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
          <Link href={`/credit/edit/${coupon._id}`} className="">
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

  toast.info("Deleting selected Discount...");

  const response = await fetch(
    `https://e-com-promo-api.vercel.app/api/v1/discounts/${id}`,
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
