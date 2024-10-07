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
import { useDiscountContext } from "@/components/hook/discountContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

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

const SearchDiscount: React.FC<SearchCouponProps> = ({ filters, onSearch }) => {
  const { searchDiscounts, setFilters, filtersD, refetch } =
    useDiscountContext();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  console.log(formValues, "formValues");

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
    searchDiscounts(filtersD);
  };

  const handleReset = () => {
    setFormValues({});
    setFilters({});
    refetch();
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
            ) : filter.type === "date" ? (
              <div>
                <label className="block pb-1 text-sm font-semibold">
                  {filter.label}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !formValues[filter.name] && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formValues[filter.name] ? (
                        format(new Date(formValues[filter.name]), "PPP")
                      ) : (
                        <span>{filter.placeholder || "Pick a date"}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        formValues[filter.name]
                          ? new Date(formValues[filter.name])
                          : undefined
                      }
                      onSelect={(date) =>
                        handleInputChange(
                          filter.name,
                          date ? date.toISOString() : ""
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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

export default SearchDiscount;
