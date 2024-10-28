import { optional, options, symbol } from "joi";

export const filters = [
  {
    label: "Coupon Code",
    name: "couponCode",
    placeholder: "Enter coupon code",
  },
  {
    name: "validForCountry",
    label: "Valid for Countries",
    placeholder: "Select countries",
    type: "select",
    options: [
      { label: "All Countries", value: "ALL" },
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "United States/Canada", value: "US/UK" },
      { label: "Rest of the World", value: "ROW" },
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
  {
    name: "month",
    label: "Birthday / Anniversary Month",
    placeholder: "Select month",
    type: "select",
    options: [
      { label: "January", value: "january" },
      { label: "February", value: "february" },
      { label: "March", value: "march" },
      { label: "April", value: "april" },
      { label: "May", value: "may" },
      { label: "June", value: "june" },
      { label: "July", value: "july" },
      { label: "August", value: "august" },
      { label: "September", value: "september" },
      { label: "October", value: "october" },
      { label: "November", value: "november" },
      { label: "December", value: "december" },
    ],
  },
];

export const discountFilters = [
  {
    label: "Cart Amount",
    name: "cartAmount",
    placeholder: "",
    type: "number",
    isPriceSymbol: true,
    symbol: "$",
  },
  {
    label: "Discount %",
    name: "discountPercentage",
    placeholder: "",
    type: "number",
    isPriceSymbol: true,
    symbol: "%",
  },
  {
    name: "validForCountry",
    label: "Valid for Countries",
    placeholder: "Select ",
    type: "select",
    options: [
      { label: "All Countries", value: "ALL" },
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "United States/Canada", value: "US/UK" },
      { label: "Rest of the World", value: "ROW" },
    ],
  },
  {
    name: "startDate",
    label: "Discount Date From:",
    type: "date",
    placeholder: "Select",
  },
  {
    name: "endDate",
    label: "Discount Date To:",
    type: "date",
    placeholder: "Select",
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
