"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
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
  setRowSelection: (rowSelection: Record<string, any>) => void;
  rowSelection: Record<string, any>;
  setSelectedRow: (selectedRow: any) => void;
  selectedRow: any;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  limit: number;
  page: number;
  totalPages: number;
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
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState<any>(new Set());
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [filtersC, setFilters] = useState<any>({
    sortBy: "startDate",
    sortOrder: "desc",
    page,
    limit,
  });
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    // Update filtersC whenever page or limit changes
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      page,
      limit,
    }));
  }, [page, limit]);
  // Function to fetch credits from the API
  const fetchCredits = async (filters: Record<string, any>) => {
    const response = await fetch(
      `https://e-com-promo-api.vercel.app/api/v1/credits?${new URLSearchParams(
        filters
      )}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch credits");
    }
    const data = await response.json();
    setCredits(data.data);
    setTotalPages(data?.pagination?.totalPages);
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
      value={{
        credits,
        searchCredits,
        refetch,
        setFilters,
        filtersC,
        setRowSelection,
        rowSelection,
        setSelectedRow,
        selectedRow,
        setLimit,
        setPage,
        limit,
        page,
        totalPages,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};
