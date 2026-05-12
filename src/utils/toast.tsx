import React from "react";
import toast from "react-hot-toast";
// import Toast from "src/components/shared/toast";

type ToastType = "success" | "error";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

/**
 * Custom toast notification utility
 * @param type - Type of toast (success or error)
 * @param title - Title of the toast
 * @param message - Main message content
 * @param options - Additional toast options (duration, position)
 */
export const showToast = ({
  type,
  title,
  message,
  options,
}: {
  type: ToastType;
  title: string;
  message: string;
  options?: ToastOptions;
}) => {
  const defaultOptions = {
    duration: 5000,
    position: "top-right" as const,
    ...options,
  };

  return toast
};
