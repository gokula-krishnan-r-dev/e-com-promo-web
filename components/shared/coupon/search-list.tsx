"use client";
import InputField from "@/components/shared/coupon/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCouponContext } from "@/components/hook/CouponContext";
interface SearchCouponProps {
  filters: any[];
  onSearch: (values: Record<string, string>) => void;
}

interface Filter {
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "select"; // Define the allowed types
  options?: { value: string; label: string }[]; // Options for the Select component
}

const SearchCoupon: React.FC<SearchCouponProps> = ({ filters, onSearch }) => {
  const { searchCoupons, setFilters, filtersC, refetch, isLoading } =
    useCouponContext();
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  console.log(filtersC, "filtersC");

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  console.log("gokul", formValues, filtersC);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formValues);
    searchCoupons({ ...filtersC, ...formValues });
  };
  interface Filters {
    [key: string]: string;
  }

  const handleReset = () => {
    setFilters((prevFilters: Filters) => {
      const updatedFilters = { ...prevFilters };

      // Reset only keys present in formValues
      Object.keys(formValues).forEach((key) => {
        const value = formValues[key];
        if (key in updatedFilters) {
          // i want to remove that key and value as well
          delete updatedFilters[key];
        }
      });

      return updatedFilters;
    });

    refetch();

    setFormValues({});
  };
  console.log(formValues, "formValues");

  return (
    <form
      className="border rounded-r-xl mt-6 mb-6 mx-4 rounded-l-xl"
      onSubmit={handleSubmit}
    >
      <div className="bg-[#EAECF0] text-sm font-semibold px-2 py-2 rounded-tr-xl rounded-tl-xl">
        Search Filters
      </div>
      <div className="grid grid-cols-3 gap-4 px-4 py-4">
        {filters.map((filter) => (
          <div key={filter.name}>
            {filter.type === "select" ? (
              <div>
                <label className="block pb-1 text-sm font-semibold">
                  {filter.label}
                </label>
                <Select
                  value={formValues[filter.name] || ""}
                  onValueChange={(value: string) =>
                    handleInputChange(filter.name, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{filter.label}</SelectLabel>
                      {filter.options?.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <InputField
                symbol={filter.symbol} // Pass the symbol prop
                isPriceSymbol={filter.isPriceSymbol} // Pass the isPriceSymbol prop
                label={filter.label}
                name={filter.name}
                value={formValues[filter.name] || ""}
                type={filter.type}
                placeholder={filter.placeholder}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end px-4 pb-4 gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-lg border text-sm font-medium"
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-custom-blue-start to-custom-blue-end flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg font-medium"
        >
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchCoupon;
