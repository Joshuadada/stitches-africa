"use client";

import { MouseEventHandler, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
    loading?: boolean;
};

const Button = ({
    children,
    onClick,
    type = "button",
    className = "",
    disabled = false,
    loading = false,
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        w-full rounded-md p-2 transition
        flex items-center justify-center gap-2
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
        >
            {loading && (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {children}
        </button>
    );
};

export default Button;