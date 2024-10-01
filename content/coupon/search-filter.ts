import { symbol } from "joi";

export const filters = [
  {
    label: "Coupon Code",
    name: "couponCode",
    placeholder: "Enter coupon code",
  },
  // {
  //   label: "Coupon Type",
  //   name: "couponType",
  //   placeholder: "Select coupon type",
  //   type: "select",
  //   options: [
  //     { label: "PERCENTAGE", value: "percentage" },
  //     { label: "Fixed Amount", value: "fixed" },
  //   ],
  // },
  {
    name: "validForCountry",
    label: "Valid for Countries",
    placeholder: "Select countries",
    type: "select",
    options: [
      { label: "All Country", value: "all" },
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Australia", value: "au" },
    ],
  },
  {
    name: "status",
    label: "Coupon Status",
    placeholder: "Select coupon status",
    type: "select",
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
    ],
  },
  {
    name: "useType",
    label: "Coupon use type",
    placeholder: "Select coupon use type",
    type: "select",
    options: [
      { label: "Single use", value: "ONE_TIME" },
      { label: "Multiple use", value: "MULTIPLE" },
    ],
  },
];

export const discountFilters = [
  {
    label: "Cart Amount",
    name: "cartAmount",
    placeholder: "Enter coupon code",
    type: "number",
    isPriceSymbol: true,
    symbol: "$",
  },
  {
    label: "Discount %",
    name: "discountPercentage",
    placeholder: "Select coupon type",
    type: "number",
    isPriceSymbol: true,
    symbol: "%",
  },
  {
    name: "validForCountry",
    label: "Valid for Countries",
    placeholder: "Select countries",
    type: "select",
    options: [
      { label: "All Country", value: "all" },
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Australia", value: "au" },
    ],
  },
  {
    namm: "startDate",
    label: "Discount Date From:",
    type: "date",
    placeholder: "Select start date",
  },
  {
    namm: "endDate",
    label: "Discount Date To:",
    type: "date",
    placeholder: "Select end date",
  },
];

export const userFilters = [
  {
    label: "First Name",
    name: "firstName",
    placeholder: "Enter first name",
  },
  {
    label: "Last Name",
    name: "lastName",
    placeholder: "Enter last name",
  },
];

export const creditFilters = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
  },
  {
    name: "vaildUpTo",
    label: "Valid Up To",
    type: "date",
    placeholder: "Select date",
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Select status",
    type: "select",
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
    ],
  },
];
