import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
    data: T | null;
    error: string | null;
    customError: string | null; // Added for custom error state
    isLoading: boolean;
    initialLoading: boolean;
}

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const useFetch = <T>(url: string, options?: FetchOptions): FetchState<T> & { refetch: () => void } => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [customError, setCustomError] = useState<string | null>(null); // Added for custom error state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [retryCount, setRetryCount] = useState<number>(0);

    const getCookies = () => {
        return document.cookie.split(';').reduce((cookies, cookie) => {
            const [name, value] = cookie.split('=');
            cookies[name.trim()] = value;
            return cookies;
        }, {} as Record<string, string>);
    };

    const fetchData = useCallback(async () => {
        if (initialLoading) setIsLoading(true);
        setIsLoading(true);
        setError(null); // Reset error before fetching
        setCustomError(null); // Reset custom error before fetching
        try {
            const cookies = getCookies();
            const accessToken = cookies['accessToken'];
            const cookieHeader = Object.entries(cookies)
                .map(([name, value]) => `${name}=${value}`)
                .join('; ');

            const response = await fetch(process.env.NEXT_BACKEND_URL + url || 'http://localhost:3434' + url, {
                ...options,
                credentials: 'include' as RequestCredentials,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                    Cookie: cookieHeader,
                    ...options?.headers,
                },
            });

            if (!response.ok) {
                const result = await response.json();
                if (result.message?.response?.code === 'UNAUTHORIZED' && result.message?.response?.statusCode === 401) {
                    setCustomError(result.message.response.message);
                    return;
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            if (retryCount < 1) {
                setRetryCount(retryCount + 1);
            } else {
                setError((err as Error).message);
            }
        } finally {
            setIsLoading(false);
            if (initialLoading) setInitialLoading(false); // Set initialLoading to false after first fetch
        }
    }, [url, options, retryCount, initialLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        setRetryCount(0);
        fetchData();
    }, [fetchData]);

    return { data, error, customError, isLoading, initialLoading, refetch };
};
