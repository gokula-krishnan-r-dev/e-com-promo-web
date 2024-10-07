"use client";
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import Joi from "joi";
import { toast } from "sonner";

// Define the Credit interface
interface Credit {
  id: string;
  creditAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  user: string;
  remarks?: string;
  [key: string]: any; // For additional properties
}

// Define the context interface
interface CreditContextProps {
  credits: Credit[];
  filtersC: Record<string, any>;
  refetch: () => void;
  setFilters: (filters: Record<string, any>) => void;
  searchCredits: (filters: Record<string, any>) => void;
}

// Create the Credit context
const CreditContext = createContext<CreditContextProps | undefined>(undefined);

// Custom hook to access the Credit context
export const useCreditContext = (): CreditContextProps => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCreditContext must be used within a CreditProvider");
  }
  return context;
};

// Joi validation schema for Credit search
const validateCreditSearch = Joi.object({
  creditAmount: Joi.number().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  status: Joi.string().optional(),
  user: Joi.string().optional(),
  sortBy: Joi.string()
    .valid("startDate", "endDate", "creditAmount", "status")
    .default("startDate")
    .optional(),
  sortOrder: Joi.string().valid("asc", "desc").default("desc").optional(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
});

// CreditProvider component to provide the context
export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [filtersC, setFilters] = useState<any>({
    sortBy: "startDate",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  });

  // Function to fetch credits from the API
  const fetchCredits = async (filters: Record<string, any>) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/credits?${new URLSearchParams(filters)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch credits");
    }
    const data = await response.json();
    setCredits(data.credits);
    return data;
  };

  // React Query hook to handle fetching credits
  const { refetch } = useQuery(
    ["credit", { page: filtersC.page, limit: filtersC.limit }],
    () => fetchCredits(filtersC),
    { keepPreviousData: true }
  );

  // Function to search credits based on filters
  const searchCredits = (filters: Record<string, any>) => {
    const { error, value } = validateCreditSearch.validate(filters);
    if (error) {
      error.details.forEach((err) => toast.error(err.message));
      console.error(
        "Invalid search query:",
        error.details.map((err) => err.message)
      );
      return;
    }
    setFilters(value);
    refetch();
  };

  // Return the context provider with relevant values
  return (
    <CreditContext.Provider
      value={{ credits, searchCredits, refetch, setFilters, filtersC }}
    >
      {children}
    </CreditContext.Provider>
  );
};
