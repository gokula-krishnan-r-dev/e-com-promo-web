"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Joi from "joi";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { formFields } from "@/content/coupon/gene-form";
import { useMutation } from "@/components/hook/useMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductDialog } from "../product-popup";
import { Singleproduct } from "../single-product-popup";
// Define types for form data and validation errors
interface FormData {
  [key: string]: string | number;
}

interface ValidationErrors {
  [key: string]: string;
}
// Define a static Joi schema
const formSchema = Joi.object({
  // couponType: Joi.string().required().messages({
  //   "any.required": "Coupon Type is required.",
  // }),
  couponTypeDiscount: Joi.string().required().messages({
    "any.required": "Coupon Type Discount is required.",
  }),
  couponMethod: Joi.string().required().messages({
    "any.required": "Coupon Method is required.",
  }),
  couponCode: Joi.string().min(3).max(10).required().messages({
    "any.required": "Coupon Code is required.",
    "string.min": "Coupon Code must be at least 3 characters long.",
    "string.max": "Coupon Code must be less than 10 characters long.",
  }),
  discountType: Joi.string().valid("FLAT", "PERCENTAGE").required().messages({
    "any.required": "Discount Type is required.",
    "any.only": 'Discount Type must be either "flat" or "percentage".',
  }),
  discountValue: Joi.when("discountType", {
    is: "PERCENTAGE",
    then: Joi.number().min(0).max(100).required().messages({
      "number.min": "Percentage must be between 0 and 100.",
      "number.max": "Percentage must be between 0 and 100.",
    }),
    otherwise: Joi.number().min(0).required().messages({
      "number.min": "Flat discount must be greater than or equal to 0.",
    }),
  }),
  minimumPurchase: Joi.number().optional().messages({
    "number.base": "Minimum Purchase must be a number.",
  }),
  startDate: Joi.date().required().messages({
    "any.required": "Start Date is required.",
  }),
  endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "any.required": "End Date is required.",
    "date.greater": "End Date must be after the Start Date.",
  }),
  useType: Joi.string().valid("ONE_TIME", "MULTIPLE").required().messages({
    "any.required": "Use Type is required.",
    "any.only": 'Use Type must be either "single" or "multiple".',
  }),
  validForCountry: Joi.string().required().messages({
    "any.required": "Valid For Countries is required.",
  }),
  validOnProducts: Joi.string().required().messages({
    "any.required": "Valid On Products is required.",
  }),
  displayOnSite: Joi.boolean().required().messages({
    "any.required": "Display On Site is required.",
  }),
  categories: Joi.array().items(Joi.any()).optional().messages({
    "array.base": "Categories must be an array.",
  }),
  product: Joi.array().items(Joi.any()).optional().messages({
    "array.base": "Product must be and array.",
  }),
  description: Joi.string().optional().messages({}),
  status: Joi.string().valid("ACTIVE", "INACTIVE").required().messages({
    "any.required": "Status is required.",
    "any.only": 'Status must be either "active" or "inactive".',
  }),
  noOfCoupon: Joi.number().min(1).max(50).optional().messages({
    "number.base": "No of Coupon must be a number.",
  }),
});

const GeneCouponForm: React.FC<any> = ({ method, defaultValue }: any) => {
  const router = useRouter();
  const { data, isLoading, mutate, error } = useMutation(
    `/coupons/${method === "PUT" ? defaultValue._id : ""}`,
    {
      method: method === "PUT" ? "PUT" : "POST",
    }
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenSingleproduct, setIsOpenSingleproduct] =
    useState<boolean>(false);

  // Initialize form data with empty fields
  const [formData, setFormData] = useState<any>(
    defaultValue || {
      discountType: "PERCENTAGE",
    }
  );
  // useEffect(() => {
  //   if (formData.validOnProducts === "SPECIFIC_CATEGORY") {
  //     setIsOpen(true);
  //   }
  //   if (formData.validOnProducts === "SPECIFIC_PRODUCT") {
  //     setIsOpenSingleproduct(true);
  //   }
  // }, [formData.validOnProducts]);

  const hanletoChageOpen = (value: string) => {
    console.log(value, "gokula");

    if (value === "SPECIFIC_CATEGORY") {
      setIsOpen(true);
      setIsOpenSingleproduct(false); // Close other popup
    } else if (value === "SPECIFIC_PRODUCT") {
      setIsOpenSingleproduct(true);
      setIsOpen(false); // Close other popup
    } else {
      // Close both if neither condition matches
      setIsOpen(false);
      setIsOpenSingleproduct(false);
    }
  };

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [autoGeneratedCode, setAutoGeneratedCode] = useState<string>("");

  const handleDateChange = (date: Date, fieldName: string) => {
    setFormData({
      ...formData,
      [fieldName]: date.toISOString(),
    });
  };

  // Handle changes in the form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData, "formData");

  const excludeFields = [
    "_id",
    "__v",
    "categories",
    "moduleId",
    "productId",
    "useCount",
    "updatedAt",
    "createdAt",
    "couponType",
    "diffrance",
  ]; // A

  // Static validate function using the predefined Joi schema
  const validate = (): boolean => {
    const final = Object.keys(formData).reduce(
      (acc: { [key: string]: any }, key) => {
        if (!excludeFields.includes(key)) {
          acc[key] = formData[key];
        }
        return acc;
      },
      {}
    );
    const { error } = formSchema.validate(
      method === "POST" ? formData : final,
      { abortEarly: false }
    );
    console.log(error, "error");

    if (error) {
      const newErrors: ValidationErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Generate a random coupon code
  const generateCouponCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleCouponMethodChange = (value: string) => {
    console.log(value, "value");

    if (value === "auto") {
      const generatedCode = generateCouponCode();
      setAutoGeneratedCode(generatedCode);
      setFormData({
        ...formData,
        couponMethod: value,
        couponCode: generatedCode,
      });
    } else {
      setFormData({ ...formData, couponCode: "", couponMethod: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      const final = {
        ...formData,
        couponType: "GENERAL",
      };

      mutate(final, method === "PUT" ? "PUT" : "POST", {
        onSuccess: (response) => {
          if (response.status === 201 || response.status === 200) {
            // Show a success toast message
            toast.success("Coupon created successfully!");
            router.back();
          }
        },
        onError: (error) => {
          // Handle the error if the request fails
          toast.error(error.message || "An error occurred. Please try again.");
          console.error("Error:", error);
        },
      });
    }
  };

  const handletoClear = () => {
    setFormData({});
    window.location.reload();

    toast.success("Form Cleared Successfully!");
  };

  const updatedFormFields = useMemo(() => {
    if (formData.couponMethod === "auto") {
      return formFields.map((field) => {
        if (field.name === "couponCode") {
          return {
            ...field,
            name: "noOfCoupon",
            label: "No. of Codes", // Update label
            placeholder: "Enter No. of Codes", // Optional: update placeholder
          };
        }
        return field;
      });
    }
    return formFields;
  }, [formData.couponMethod]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 w-full rounded-lg border space-y-5"
    >
      {updatedFormFields.map((field) => {
        if (field.name === "discountType" || field.name === "discountValue") {
          return (
            <div className="">
              <label
                htmlFor={field.id}
                className="flex items-center gap-2 text-gray-700 text-sm pb-1 font-medium"
              >
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-500">
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.19515 10.5C8.69775 10.5 10.8903 8.57293 10.8903 6C10.8903 3.42707 8.69775 1.5 6.19515 1.5C3.69254 1.5 1.5 3.42707 1.5 6C1.5 8.57293 3.69254 10.5 6.19515 10.5Z"
                        fill="#F04438"
                        stroke="#FFEAE8"
                        strokeWidth="3"
                      />
                    </svg>
                  </span>
                )}
              </label>
              <div className="flex justify-between w-full items-center gap-3">
                <RadioGroup
                  disabled={method === "view"}
                  defaultValue={field.defaultValue}
                  value={formData[field.name] as string}
                  onValueChange={(value) =>
                    setFormData({ ...formData, [field.name]: value })
                  }
                  className="flex space-x-24"
                >
                  {field.options?.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex items-center w-[50%] flex-col">
                  <div className="relative w-full">
                    <span className="absolute top-2 left-3">
                      {field.name === "discountType"
                        ? formData["discountType"] === "FLAT"
                          ? "$"
                          : "%"
                        : "$"}
                    </span>
                    <input
                      disabled={method === "view"}
                      type="text"
                      id="discountValue"
                      name="discountValue"
                      value={formData["discountValue"] as string}
                      onChange={(e) => {
                        const value = e.target.value;
                        let updatedValue = value;

                        if (formData["discountType"] === "FLAT") {
                          // Allow only numbers and ensure value is greater than or equal to 1
                          updatedValue = value.replace(/\D/g, ""); // Removes any non-digit character
                          if (parseInt(updatedValue) < 1) updatedValue = "1";
                        } else if (formData["discountType"] === "percentage") {
                          // Allow only numbers and restrict percentage between 1 and 100
                          updatedValue = value.replace(/\D/g, ""); // Removes any non-digit character
                          if (parseInt(updatedValue) < 1) updatedValue = "1";
                          if (parseInt(updatedValue) > 100)
                            updatedValue = "100";
                        }

                        handleChange({
                          target: {
                            name: "discountValue",
                            value: updatedValue,
                          },
                        });
                      }}
                      placeholder={field.placeholder}
                      className={`placeholder:text-[#667085]  pl-8 border rounded-lg py-2.5 w-full px-4 text-sm ${
                        errors["discountValue"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors["discountValue"] && (
                    <p className="text-red-500 pt-1 text-sm">
                      {errors["discountValue"]}
                    </p>
                  )}{" "}
                </div>
              </div>
            </div>
          );
        }

        if (field.type === "date") {
          return (
            <div className="gap-2 flex-col flex" key={field.name}>
              <label
                htmlFor={field.id}
                className="flex items-center gap-2 text-gray-700 text-sm pb-1 font-medium"
              >
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-500">
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.19515 10.5C8.69775 10.5 10.8903 8.57293 10.8903 6C10.8903 3.42707 8.69775 1.5 6.19515 1.5C3.69254 1.5 1.5 3.42707 1.5 6C1.5 8.57293 3.69254 10.5 6.19515 10.5Z"
                        fill="#F04438"
                        stroke="#FFEAE8"
                        strokeWidth="3"
                      />
                    </svg>
                  </span>
                )}
              </label>
              <div className="flex gap-3 w-full items-center">
                {/* Popover for Start/End Date */}
                <div className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={method === "view"}
                        variant={"outline"}
                        className={cn(
                          "w-full justify-between flex text-[#667085] items-center  text-left font-medium",
                          !formData[field.name] && "text-muted-foreground"
                        )}
                      >
                        {formData[field.name]
                          ? format(
                              new Date(formData[field.name] as string),
                              "PPP"
                            )
                          : "Date Valid From"}
                        <CalendarIcon className="mr-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData[field.name] as unknown as Date}
                        onSelect={(date: Date | undefined) =>
                          handleDateChange(date as Date, field.name)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>{" "}
                  {errors[field.name] && (
                    <p className="text-red-500 pt-1 text-sm">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
                <h3>-</h3>
                <div className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={method === "view"}
                        variant={"outline"}
                        className={cn(
                          "w-full justify-between text-[#667085] flex items-center text-left font-medium",
                          !formData["endDate"] && "text-muted-foreground"
                        )}
                      >
                        {formData["endDate"]
                          ? format(
                              new Date(formData["endDate"] as string),
                              "PPP"
                            )
                          : "Date Valid To"}
                        <CalendarIcon className="mr-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData["endDate"] as unknown as Date}
                        onSelect={(date: Date | undefined) =>
                          handleDateChange(date as Date, "endDate")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors["endDate"] && (
                    <p className="text-red-500 pt-1 text-sm">
                      {errors["endDate"]}
                    </p>
                  )}{" "}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label
              htmlFor={field.id}
              className="flex items-center gap-2 text-gray-700 text-sm pb-1 font-medium"
            >
              {field.label}{" "}
              {field.required && (
                <span className="text-red-500">
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.19515 10.5C8.69775 10.5 10.8903 8.57293 10.8903 6C10.8903 3.42707 8.69775 1.5 6.19515 1.5C3.69254 1.5 1.5 3.42707 1.5 6C1.5 8.57293 3.69254 10.5 6.19515 10.5Z"
                      fill="#F04438"
                      stroke="#FFEAE8"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
              )}
            </label>
            {field.type === "radio" ? (
              <>
                {" "}
                {field.type === "radio" && field.name === "couponMethod" ? (
                  <RadioGroup
                    value={formData[field.name] as string}
                    disabled={method === "view"}
                    onValueChange={(value) => {
                      setFormData({ ...formData, [field.name]: value });
                      handleCouponMethodChange(value);
                    }}
                    className="flex  space-x-4"
                  >
                    {field.options?.map((option) => (
                      <div
                        key={option.value}
                        className="flex  items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : field.type === "radio" ? (
                  <RadioGroup
                    disabled={method === "view"}
                    value={formData[field.name] as string}
                    onValueChange={(value) => {
                      setFormData({ ...formData, [field.name]: value });
                    }}
                    onClick={() => {
                      hanletoChageOpen(formData[field.name]);
                    }}
                    className="flex space-x-4"
                  >
                    {field.options?.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                        onClick={() => {
                          hanletoChageOpen(formData[field.name]);
                        }}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                        <Label
                          htmlFor={option.value}
                          className={`cursor-pointer ${
                            field.name === "validOnProducts" &&
                            formData[field.name] !== "ALL_PRODUCTS" &&
                            ((formData[field.name] === option.value && formData?.categories?.length > 0) ||
                              formData.product === option.value)
                              ? "underline"
                              : ""
                          }`}
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    value={formData[field.name] as string}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="border p-2 rounded w-full"
                    disabled={method === "view"}
                  />
                )}
              </>
            ) : field.type === "select" && field.options ? (
              <Select
                disabled={method === "view"}
                value={formData[field.name] as string}
                onValueChange={(value: string) =>
                  setFormData({
                    ...formData,
                    [field.name]: value,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{field.label}</SelectLabel>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : field.type === "textarea" ? (
              <div className="">
                <textarea
                  cols={30}
                  rows={5}
                  id={field.id}
                  name={field.name}
                  value={formData[field.name] as string}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="border p-2 text-sm rounded-lg w-full"
                />
              </div>
            ) : (
              <div className="relative flex items-center gap-12">
                {field.name === "minimumPurchase" && (
                  <span className="absolute top-2 left-3">$</span>
                )}

                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  disabled={
                    (field.name === "couponMethod" &&
                      formData.couponMethod === "auto") ||
                    method === "view"
                  }
                  value={formData[field.name] as string}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`placeholder:text-[#667085] border rounded-lg py-2.5 w-full px-4 text-sm ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } ${field.name === "minimumPurchase" ? "pl-8" : ""}`}
                />
                {field.name === "minimumPurchase" && (
                  <p className="text-red-500 w-full font-semibold text-xs mt-1">
                    Leave blank / Put zero if no minimum value apply
                  </p>
                )}
              </div>
            )}
            {errors[field.name] && (
              <p className="text-red-500 pt-1 text-sm">{errors[field.name]}</p>
            )}
          </div>
        );
      })}
      <div className="flex justify-center items-center px-4 pb-4 gap-4">
        {isOpen && (
          <ProductDialog
            isOpen={isOpen}
            setFormData={setFormData}
            formData={formData}
            setIsOpen={setIsOpen}
          />
        )}
        {isOpenSingleproduct && (
          <Singleproduct
            isOpen={isOpenSingleproduct}
            setFormData={setFormData}
            formData={formData}
            setIsOpen={setIsOpenSingleproduct}
          />
        )}

        <div
          onClick={handletoClear}
          className="px-4 py-2 cursor-pointer rounded-lg border text-sm font-medium"
        >
          Clear
        </div>
        <Button
          disabled={method === "view"}
          variant={"default"}
          isLoading={isLoading}
          type="submit"
          className="bg-[#316BEB] text-white text-sm px-4 py-2 rounded-lg font-medium"
        >
          Add
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </form>
  );
};

export default GeneCouponForm;
