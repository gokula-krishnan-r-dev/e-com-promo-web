import { FormField } from "../coupon/gene-form";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Edit2, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateRange } from "@/lib/formatDateRange";
export const discountFormFields: FormField[] = [
  {
    name: "cartAmount",
    type: "number",
    label: "Cart Amount",
    id: "cartAmount",
    placeholder: "Enter cart amount",
    required: true,
    validation: {
      pattern: /^[0-9]*\.?[0-9]+$/,
      errorMessage: "Cart amount must be a valid number.",
    },
  },
  {
    name: "discountPercentage",
    type: "number",
    label: "Discount Percentage",
    id: "discountPercentage",
    placeholder: "Enter discount percentage",
    required: true,
    validation: {
      pattern: /^(100(\.0+)?|[0-9]?[0-9](\.[0-9]+)?)$/,
      errorMessage: "Discount percentage must be between 0 and 100.",
    },
  },
  {
    name: "validCountry",
    type: "select",
    label: "Valid Country",
    id: "validCountry",
    placeholder: "Select country",
    options: [
      { value: "ALL", label: "All Countries" },
      { value: "INDIA", label: "India" },
      { value: "USA", label: "United States" },
      { value: "CANADA", label: "Canada" },
    ],
    required: true,
    validation: {
      errorMessage: "Country selection is required.",
    },
  },
  {
    name: "displayOnSite",
    type: "radio",
    label: "Display On Site",
    id: "displayOnSite",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
    required: true,
    validation: {
      errorMessage: "Display on site is required.",
    },
  },
  {
    name: "displayDiscount",
    type: "number",
    label: "Display Discount (Min Cart Amount)",
    id: "displayDiscount",
    placeholder: "Enter minimum cart amount for discount display",
    required: true,
    validation: {
      pattern: /^[0-9]*\.?[0-9]+$/,
      errorMessage: "Display discount must be a valid number.",
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
];

export const firstorderDisocuntFormFields: FormField[] = [
  {
    name: "isActive",
    type: "radio",
    label: "Active",
    id: "isActive",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    required: true,
    validation: {
      errorMessage: "Active is required.",
    },
  },
  {
    name: "discountPercentage",
    type: "number",
    label: "Discount Percentage",
    id: "discountPercentage",
    placeholder: "Enter discount percentage",
    required: true,
    validation: {
      pattern: /^(100(\.0+)?|[0-9]?[0-9](\.[0-9]+)?)$/,
      errorMessage: "Discount percentage must be between 0 and 100.",
    },
  },
];

import Joi from "joi";
import Link from "next/link";

const discountFormSchema = Joi.object({
  cartAmount: Joi.number().min(0).required().messages({
    "any.required": "Cart Amount is required.",
    "number.base": "Cart Amount must be a valid number.",
    "number.min": "Cart Amount must be at least 0.",
  }),

  discountPercentage: Joi.number().min(0).max(100).required().messages({
    "any.required": "Discount Percentage is required.",
    "number.base": "Discount Percentage must be a valid number.",
    "number.min": "Discount Percentage must be between 0 and 100.",
    "number.max": "Discount Percentage must be between 0 and 100.",
  }),

  validCountry: Joi.string()
    .valid("ALL", "INDIA", "USA", "CANADA")
    .required()
    .messages({
      "any.required": "Valid Country is required.",
      "any.only":
        'Valid Country must be one of "ALL", "INDIA", "USA", or "CANADA".',
    }),

  displayOnSite: Joi.boolean().required().messages({
    "any.required": "Display On Site is required.",
    "boolean.base": "Display On Site must be a boolean value.",
  }),

  displayDiscount: Joi.number().min(0).required().messages({
    "any.required": "Display Discount is required.",
    "number.base": "Display Discount must be a valid number.",
    "number.min": "Display Discount must be at least 0.",
  }),

  startDate: Joi.date().required().messages({
    "any.required": "Start Date is required.",
    "date.base": "Start Date must be a valid date.",
  }),

  endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "any.required": "End Date is required.",
    "date.greater": "End Date must be after the Start Date.",
  }),
});

export default discountFormSchema;

// Define columns using strong typing
export const DiscountColumnstable: ColumnDef<any>[] = [
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
    accessorKey: "discountPercentage",
    header: () => <div className="text-center ">Discount %</div>,
    cell: ({ row }) => {
      const discountValue = row.getValue<number>("discountPercentage");
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
    accessorKey: "cartAmount",
    header: () => <div className="text-center">Cart Amount</div>,
    cell: ({ row }) => {
      const cartAmount = row.getValue<number>("cartAmount");
      return <div className="text-center font-medium">${cartAmount}</div>;
    },
  },
  {
    accessorKey: "validCountry",
    header: "Valid On Products",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue<string>("validCountry")}</div>
    ),
  },
  {
    accessorKey: "displayOnSite",
    header: "Display On Site",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue<string>("displayOnSite") ? (
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25 1C6.66421 1 7 1.33579 7 1.75V3.6L8.72067 3.25587C10.3712 2.92576 12.0821 3.08284 13.6449 3.70797L13.8486 3.78943C15.4097 4.41389 17.128 4.53051 18.7592 4.1227C19.5165 3.93339 20.25 4.50613 20.25 5.28669V12.6537C20.25 13.298 19.8115 13.8596 19.1864 14.0159L18.972 14.0695C17.2024 14.5119 15.3385 14.3854 13.6449 13.708C12.0821 13.0828 10.3712 12.9258 8.72067 13.2559L7 13.6V21.75C7 22.1642 6.66421 22.5 6.25 22.5C5.83579 22.5 5.5 22.1642 5.5 21.75V1.75C5.5 1.33579 5.83579 1 6.25 1Z"
              fill="#08F96C"
            />
          </svg>
        ) : (
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25 1C6.66421 1 7 1.33579 7 1.75V3.6L8.72067 3.25587C10.3712 2.92576 12.0821 3.08284 13.6449 3.70797L13.8486 3.78943C15.4097 4.41389 17.128 4.53051 18.7592 4.1227C19.5165 3.93339 20.25 4.50613 20.25 5.28669V12.6537C20.25 13.298 19.8115 13.8596 19.1864 14.0159L18.972 14.0695C17.2024 14.5119 15.3385 14.3854 13.6449 13.708C12.0821 13.0828 10.3712 12.9258 8.72067 13.2559L7 13.6V21.75C7 22.1642 6.66421 22.5 6.25 22.5C5.83579 22.5 5.5 22.1642 5.5 21.75V1.75C5.5 1.33579 5.83579 1 6.25 1Z"
              fill="#82838A"
            />
          </svg>
        )}
      </div>
    ),
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
          <Link
            href={`/discount/view/${coupon._id}`}
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
            href={`/discount/edit/${coupon._id}`}
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

export const firstOrderDiscountColumns = Joi.object({
  discountPercentage: Joi.number().min(0).max(100).required().messages({
    "any.required": "Discount Percentage is required.",
    "number.base": "Discount Percentage must be a valid number.",
    "number.min": "Discount Percentage must be between 0 and 100.",
    "number.max": "Discount Percentage must be between 0 and 100.",
  }),
  isActive: Joi.boolean().required().messages({
    "any.required": "Active is required.",
    "boolean.base": "Active must be a boolean value.",
  }),
});
