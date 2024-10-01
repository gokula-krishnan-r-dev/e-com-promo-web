"use client";
import React, { useEffect, useState } from "react";
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

import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useMutation } from "@/components/hook/useMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import discountFormSchema, {
  discountFormFields,
  firstOrderDiscountColumns,
  firstorderDisocuntFormFields,
} from "@/content/discount/discount-centent";
import { Switch } from "@/components/ui/switch";
import { useFetch } from "@/components/hook/useFetch";
import { useQuery } from "react-query";

interface ValidationErrors {
  [key: string]: string;
}

const FirstOrderDiscountForm: React.FC = () => {
  const router = useRouter();
  const { data: FirstOrderDiscount, isLoading } = useQuery(
    "discount",
    async () => {
      const response = await fetch(
        `https://e-com-promo-api.vercel.app/api/v1/discounts/first-order-discounts`
      );
      const data = await response.json();
      return data.discount;
    }
  );

  const { data, mutate, error } = useMutation(
    "/discounts/first-order-discounts",
    {
      method: "POST",
    }
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    discountPercentage: 0,
    isActive: false,
  });

  // Dynamically update form data based on FirstOrderDiscount
  useEffect(() => {
    if (FirstOrderDiscount && FirstOrderDiscount.length > 0) {
      const discountData = FirstOrderDiscount[0];

      setIsActive(discountData.isActive || false); // Update isActive based on FirstOrderDiscount
      setFormData({
        discountPercentage: discountData.discountPercentage || 0, // Set discountPercentage from data or fallback to 0
        isActive: discountData.isActive || false,
      });
    }
  }, [FirstOrderDiscount]);

  console.log(formData, "formData");

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

  // Static validate function using the predefined Joi schema
  const validate = (): boolean => {
    const { error } = firstOrderDiscountColumns.validate(formData, {
      abortEarly: false,
    });
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
      });
    } else {
      setFormData({ ...formData });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      const final = {
        ...formData,
      };

      mutate(final, "POST", {
        onSuccess: (response) => {
          if (response.status === 201) {
            // Show a success toast message
            toast.success("Coupon created successfully!");
            router.back();
          }
        },
        onError: (error) => {
          // Handle the error if the request fails
          toast.error("Failed to create coupon!");
          console.error("Error:", error);
        },
      });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 w-full rounded-lg border space-y-5"
    >
      {firstorderDisocuntFormFields.map((field) => {
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
                        } else if (formData["discountType"] === "PERCENTAGE") {
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
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData[field.name] && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData[field.name]
                          ? format(
                              new Date(formData[field.name] as string),
                              "PPP"
                            )
                          : "Date Valid From"}
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
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData["endDate"] && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData["endDate"]
                          ? format(
                              new Date(formData["endDate"] as string),
                              "PPP"
                            )
                          : "Date Valid From"}
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

        if (field.name === "isActive") {
          return (
            <div className="flex items-center gap-3">
              <Switch
                onCheckedChange={() => {
                  setIsActive(!isActive);
                  setFormData({
                    ...formData,
                    isActive: isActive,
                  });
                }}
                checked={!isActive}
                id="isActive"
              />
              <Label htmlFor="isActive">Enable First Order Discount</Label>
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
                    onValueChange={(value) => {
                      setFormData({ ...formData, [field.name]: value });
                      handleCouponMethodChange(value);
                    }}
                    className="flex space-x-4"
                  >
                    {field.options?.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
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
                    value={formData[field.name] as string}
                    onValueChange={(value) =>
                      setFormData({ ...formData, [field.name]: value })
                    }
                    className="flex space-x-4"
                  >
                    {field.options?.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
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
                    disabled={
                      field.name === "couponCode" &&
                      formData.couponMethod === "auto"
                    }
                  />
                )}
              </>
            ) : field.type === "select" && field.options ? (
              <Select
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
            ) : (
              <div className="relative flex items-center gap-12">
                {field.name === "discountPercentage" && (
                  <span className="absolute top-2 left-3">%</span>
                )}

                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  disabled={isActive}
                  value={formData[field.name] as string}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`placeholder:text-[#667085] border rounded-lg py-2.5 w-full px-4 text-sm ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } ${field.name === "discountPercentage" ? "pl-8" : ""} ${
                    isActive ? "cursor-not-allowed" : ""
                  }`}
                />
              </div>
            )}
            {errors[field.name] && (
              <p className="text-red-500 pt-1 text-sm">{errors[field.name]}</p>
            )}
          </div>
        );
      })}
      <div className="flex justify-center items-center px-4 pb-4 gap-4">
        <button
          type="button"
          className="px-4 py-2 rounded-lg border text-sm font-medium"
        >
          Clear
        </button>
        <Button
          variant={"default"}
          isLoading={isLoading}
          disabled={isActive}
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

export default FirstOrderDiscountForm;
