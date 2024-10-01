// Toast.tsx (React, TypeScript)
import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose?: () => void;
}

const Toast = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 right-5 max-w-sm w-full p-4 z-50 rounded-lg shadow-lg transition-transform transform ${
        type === "success"
          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200"
          : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200"
      }`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm2-10a1 1 0 00-2 0v2a1 1 0 002 0V8zm0 4a1 1 0 00-2 0v2a1 1 0 002 0v-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
