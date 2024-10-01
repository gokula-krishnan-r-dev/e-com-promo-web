// ToastManager.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import Toast from "@/components/layout/toast";

interface ToastData {
  id: string;
  message: string;
  type: "success" | "error";
}

interface ToastContextProps {
  showToast: (message: string, type: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Toast Manager Component
export const ToastManager: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000); // Automatically remove toast after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast: addToast }}>
      {children}
      <div>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastManager provider");
  }
  return context.showToast;
};
