"use client";

import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
          },
        }}
      />
    </>
  );
};
