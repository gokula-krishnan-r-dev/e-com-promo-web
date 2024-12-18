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
import { useCreditContext } from "@/components/hook/creditContext";

interface SearchCouponProps {
  filters: any[];
  onSearch: (values: Record<string, string>) => void;
}

const SearchCredit: React.FC<SearchCouponProps> = ({ filters, onSearch }) => {
  const { searchCredits, setFilters, refetch, filtersC } = useCreditContext();
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formValues);
    searchCredits(filtersC);
  };

  const handleReset = () => {
    setFilters((prevFilters: any) => {
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
          className="bg-[#316BEB] text-white text-sm px-4 py-2 rounded-lg font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchCredit;
