// Dynamic form field configuration

// Define the type for field validation configuration
export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage: string;
}

// Define the type for form field configuration
export interface FormField {
  name: string;
  type: string;
  label: string;
  parentName?: string;
  id: string;
  defaultValue?: string;
  placeholder?: string;
  required: boolean;
  validation: FieldValidation;
  options?: { value: any; label: string }[]; // For select and radio options
}
export const formFields: FormField[] = [
  {
    name: "couponTypeDiscount",
    type: "select",
    label: "Coupon Type",
    id: "couponTypeDiscount",
    placeholder: "Select Coupon Type",
    required: true,
    options: [
      { value: "FLAT_DISCOUNT", label: "Flat Discount" },
      { value: "FREE_SHIPPING", label: "Free shipping" },
    ],
    validation: {
      errorMessage: "Coupon code must be between 3 and 10 characters long.",
    },
  },
  {
    name: "couponMethod",
    type: "radio",
    label: "Generate By",
    id: "couponMethod",
    options: [
      { value: "self", label: "Self" },
      { value: "auto", label: "Auto" },
    ],
    required: true,
    validation: {
      errorMessage: "Coupon method is required.",
    },
  },
  {
    name: "couponCode",
    type: "text",
    label: "Coupon Code",
    id: "couponCode",
    placeholder: "Enter coupon code",
    required: true,
    validation: {
      minLength: 3,
      maxLength: 10,
      errorMessage: "Coupon code must be between 3 and 10 characters long.",
    },
  },
  {
    name: "discountType",
    type: "radio",
    label: "Discount Type",
    id: "discountType",
    defaultValue: "PERCENTAGE",
    options: [
      { value: "FLAT", label: "Flat" },
      { value: "PERCENTAGE", label: "Percentage" },
    ],
    required: true,
    validation: {
      minLength: 3,
      maxLength: 10,
      errorMessage: "Discount type is required.",
    },
  },
  {
    name: "minimumPurchase",
    type: "number",
    label: "Minimum Purchase",
    id: "minimumPurchase",
    placeholder: "Enter minimum purchase ",
    required: false,
    validation: {
      pattern: /^[0-9]*\.?[0-9]+$/,
      errorMessage: "Minimum purchase  must be a number.",
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
    name: "useType",
    type: "radio",
    label: "Use Type",
    id: "useType",
    options: [
      { value: "ONE_TIME", label: "Single" },
      { value: "MULTIPLE", label: "Multiple" },
    ],
    required: true,
    validation: {
      errorMessage: "Use type is required.",
    },
  },
  {
    name: "validForCountry",
    type: "select",
    label: "Valid For Countries",
    id: "validForCountry",
    placeholder: "Select country",
    options: [
      { label: "All Countries", value: "ALL" },
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "United States/Canada", value: "US/UK" },
      { label: "Rest of the World", value: "ROW" },
    ],
    required: true,
    validation: {
      errorMessage: "Country selection is required.",
    },
  },
  {
    name: "validOnProducts",
    type: "radio",
    label: "Valid On Products",
    id: "validOnProducts",
    options: [
      { value: "ALL_PRODUCTS", label: "All Products" },
      { value: "SPECIFIC_CATEGORY", label: "Specific Categories" },
      { value: "SPECIFIC_PRODUCT", label: "Single Product" },
    ],
    required: true,
    validation: {
      errorMessage: "Product selection is required.",
    },
  },
  {
    name: "displayOnSite",
    type: "radio",
    label: "Display On Site",
    id: "displayOnSite",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    required: true,
    validation: {
      errorMessage: "Display on site is required.",
    },
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    id: "description",
    placeholder: "Enter description",
    required: false,
    validation: {
      errorMessage: "Description is required.",
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
];

export const formFieldsBirthday: FormField[] = [
  {
    name: "discountType",
    type: "radio",
    label: "Discount Type",
    id: "discountType",
    defaultValue: "PERCENTAGE",
    options: [
      { value: "FLAT", label: "Flat" },
      { value: "PERCENTAGE", label: "Percentage" },
    ],
    required: true,
    validation: {
      minLength: 3,
      maxLength: 10,
      errorMessage: "Discount type is required.",
    },
  },

  {
    name: "minimumPurchase",
    type: "number",
    label: "Minimum Purchase ",
    id: "minimumPurchase",
    placeholder: "Enter minimum purchase ",
    required: false,
    validation: {
      pattern: /^[0-9]*\.?[0-9]+$/,
      errorMessage: "Minimum purchase  must be a number.",
    },
  },
  {
    name: "validForCountry",
    type: "select",
    label: "Valid For Countries",
    id: "validForCountry",
    placeholder: "Select country",
    options: [
      { label: "All Countries", value: "ALL" },
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "United States/Canada", value: "US/UK" },
      { label: "Rest of the World", value: "ROW" },
    ],
    required: true,
    validation: {
      errorMessage: "Country selection is required.",
    },
  },

  {
    name: "birthdayMonth",
    type: "select",
    label: "Birthday Month",
    id: "birthdayMonth",
    placeholder: "Select birthday month",
    required: true,
    options: [
      { value: "january", label: "January" },
      { value: "february", label: "February" },
      { value: "march", label: "March" },
      { value: "april", label: "April" },
      { value: "may", label: "May" },
      { value: "june", label: "June" },
      { value: "july", label: "July" },
      { value: "august", label: "August" },
      { value: "september", label: "September" },
      { value: "october", label: "October" },
      { value: "november", label: "November" },
      { value: "december", label: "December" },
    ],
    validation: {
      errorMessage: "Birthday month is required.",
    },
  },
  {
    name: "userList",
    type: "userList",
    label: "User List",
    id: "userList",
    required: true,
    validation: {
      errorMessage: "User list is required.",
    },
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    id: "description",
    placeholder: "Enter description",
    required: false,
    validation: {
      errorMessage: "Description is required.",
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
      errorMessage: "Status is required",
    },
  },
];

export const formFieldsAnniversary: FormField[] = [
  {
    name: "discountType",
    type: "radio",
    label: "Discount Type",
    id: "discountType",
    defaultValue: "PERCENTAGE",
    options: [
      { value: "FLAT", label: "Flat" },
      { value: "PERCENTAGE", label: "Percentage" },
    ],
    required: true,
    validation: {
      minLength: 3,
      maxLength: 10,
      errorMessage: "Discount type is required.",
    },
  },

  {
    name: "minimumPurchase",
    type: "number",
    label: "Minimum Purchase ",
    id: "minimumPurchase",
    placeholder: "Enter minimum purchase ",
    required: false,
    validation: {
      pattern: /^[0-9]*\.?[0-9]+$/,
      errorMessage: "Minimum purchase  must be a number.",
    },
  },
  {
    name: "validForCountry",
    type: "select",
    label: "Valid For Countries",
    id: "validForCountry",
    placeholder: "Select country",
    options: [
      { label: "All Countries", value: "ALL" },
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "United States/Canada", value: "US/UK" },
      { label: "Rest of the World", value: "ROW" },
    ],
    required: true,
    validation: {
      errorMessage: "Country selection is required.",
    },
  },

  {
    name: "anniversaryMonth",
    type: "select",
    label: "Anniversary Month",
    id: "anniversaryMonth",
    placeholder: "Select anniversary month",
    required: true,
    options: [
      { value: "january", label: "January" },
      { value: "february", label: "February" },
      { value: "march", label: "March" },
      { value: "april", label: "April" },
      { value: "may", label: "May" },
      { value: "june", label: "June" },
      { value: "july", label: "July" },
      { value: "august", label: "August" },
      { value: "september", label: "September" },
      { value: "october", label: "October" },
      { value: "november", label: "November" },
      { value: "december", label: "December" },
    ],
    validation: {
      errorMessage: "Birthday month is required.",
    },
  },
  {
    name: "userList",
    type: "userList",
    label: "User List",
    id: "userList",
    required: true,
    validation: {
      errorMessage: "User list is required.",
    },
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    id: "description",
    placeholder: "Enter description",
    required: false,
    validation: {
      errorMessage: "Description is required.",
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
      errorMessage: "Status is required",
    },
  },
];
