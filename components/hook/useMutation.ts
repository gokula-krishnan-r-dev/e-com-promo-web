import { useState, useCallback } from "react";

interface MutationState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
}

interface UseMutationReturn<T, V> extends MutationState<T> {
  mutate: (
    variables: V,
    method: string,
    callbacks?: {
      onSuccess?: (response: Response) => void;
      onError?: (error: Error) => void;
    }
  ) => void;
}

export const useMutation = <T, V>(
  url: string,
  options?: RequestInit
): UseMutationReturn<T, V> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Utility to retrieve cookies from the document
  const getCookies = () => {
    return document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, value] = cookie.split("=");
      cookies[name.trim()] = value;
      return cookies;
    }, {} as Record<string, string>);
  };

  const mutate = useCallback(
    async (
      variables: V,
      method: string,
      callbacks?: {
        onSuccess?: (response: Response) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      setIsLoading(true);
      setIsSuccess(false); // Reset success state before new request
      setError(null); // Reset error state before new request

      try {
        const cookies = getCookies();
        const accessToken = cookies["accessToken"];
        const cookieHeader = Object.entries(cookies)
          .map(([name, value]) => `${name}=${value}`)
          .join("; ");

        // Determine if the request payload is FormData
        const isFormData = variables instanceof FormData;

        const response = await fetch(
          "https://e-com-promo-api-57xi.vercel.app/api/v1" + url,
          {
            ...options,
            method,
            body: isFormData ? variables : JSON.stringify(variables),
            headers: {
              ...(!isFormData && { "Content-Type": "application/json" }), // Only set Content-Type if not FormData
              ...options?.headers,
              Cookie: cookieHeader, // Include cookies in the request
              Authorization: `Bearer ${accessToken}`, // Add Authorization header with token if needed
            },
          }
        );

        const result: any = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setData(result);
        setIsSuccess(true); // Mark the request as successful

        // Trigger success callback if provided
        if (callbacks?.onSuccess) {
          callbacks.onSuccess(response);
        }
      } catch (err) {
        setData(null);
        setError(err as Error);
        setIsSuccess(false);

        // Trigger error callback if provided
        if (callbacks?.onError) {
          callbacks.onError(err as Error);
        }
      } finally {
        setIsLoading(false); // End loading state
      }
    },
    [url, options]
  );

  return { data, error, isLoading, isSuccess, mutate };
};
