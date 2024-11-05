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
import { isBefore, parseISO } from "date-fns";

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
    type: "radio",
    label: "Valid Upto",
    id: "startDate",
    options: [
      { value: "1", label: "One Month" },
      { value: "2", label: "Valid Upto" },
    ],
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
      { value: "ALL", label: "All Users" },
      { value: "SELECTED", label: "Individual Users" },
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
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }: { row: Row<CouponData> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "creditAmount",
    header: () => <div className="text-start pl-4">Credit Amount</div>,
    cell: ({ row }) => {
      const creditAmount = row.getValue<number>("creditAmount");
      return <div className="text-start pl-4 font-medium">${creditAmount}</div>;
    },
  },
  {
    accessorKey: "usedAmount",
    header: () => <div className="text-center pl-4">Used Amount</div>,
    cell: ({ row }) => {
      const creditAmount = row.getValue<number>("usedAmount") || 0;
      return (
        <div className="text-center pl-4 font-medium">${creditAmount}</div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-center ">Credit Validity</div>,
    cell: ({ row }) => {
      const startDate = row.getValue<string>("startDate");
      const endDate = row.getValue<string>("endDate");
      return <div>{formatDateRange(startDate, endDate)}</div>;
    },
  },
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
        <div className={`flex items-center justify-center`}>
          <div className="capitalize  justify-center text-center bg-white flex w-max items-center border px-4 py-0 gap-2 rounded-full">
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
            {status.charAt(0).toUpperCase() +
              status.slice(1).toLocaleLowerCase()}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const coupon = row.original; // This will refer to the flattened data

      return (
        <div className="gap-2 flex items-center justify-center space-x-2">
          <Link href={`/credit/edit/${coupon._id}`}>
            <Edit2 size={20} />
          </Link>

          <button
            onClick={() => {
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
