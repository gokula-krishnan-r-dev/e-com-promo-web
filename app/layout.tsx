"use client";
import "./globals.css";
import { Toaster } from "sonner";
import setupLocatorUI from "@locator/runtime";
import { QueryClient, QueryClientProvider } from "react-query";
// Create a client
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === "development") {
    setupLocatorUI();
  }
  const queryClient = new QueryClient();
  return (
    <html className="light" lang="en">
      <body className={` bg-[#F7F7F7] text-black  antialiased`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
