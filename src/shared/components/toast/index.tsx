"use client";

import React from "react";
import toast from "react-hot-toast";

type Props = {
  type: "success" | "error";
  title: string;
  message: string;
  id: string;
};

const SuccessIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="rgba(255,255,255,0.2)" />
    <circle cx="18" cy="18" r="13" fill="rgba(255,255,255,0.2)" />
    <path
      d="M11 18L15.5 22.5L25 13"
      stroke="white"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="rgba(255,255,255,0.2)" />
    <circle cx="18" cy="18" r="13" fill="rgba(255,255,255,0.2)" />
    <path
      d="M13 13L23 23M23 13L13 23"
      stroke="white"
      strokeWidth="2.25"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

const Toast: React.FC<Props> = ({ type, title, message, id }) => {
  const isSuccess = type === "success";

  return (
    <div
      style={{
        background: isSuccess
          ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
          : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
        boxShadow: isSuccess
          ? "0 8px 24px rgba(34,197,94,0.35), 0 2px 8px rgba(0,0,0,0.12)"
          : "0 8px 24px rgba(239,68,68,0.35), 0 2px 8px rgba(0,0,0,0.12)",
      }}
      className="relative flex items-center gap-3 w-full max-w-72 sm:max-w-xs rounded-xl px-3.5 py-3 pr-9"
    >
      {/* Subtle gloss overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-xl" />
      </div>

      {/* Icon */}
      <div className="relative shrink-0">
        {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
      </div>

      {/* Text */}
      <div className="relative flex flex-col min-w-0 flex-1">
        <p className="text-white text-[13px] font-semibold leading-snug tracking-tight">{title}</p>
        <p className="text-white/80 text-[12px] leading-snug mt-0.5 wrap-break-word">{message}</p>
      </div>

      {/* Close */}
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors duration-150 cursor-pointer p-1"
        aria-label="Dismiss"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Toast;