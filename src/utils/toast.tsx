"use client";

import Toast from "@/shared/components/toast";
import toast from "react-hot-toast";

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

  return toast.custom(
    (t) => <Toast type={type} title={title} message={message} id={t.id} />,
    defaultOptions,
  );
};
