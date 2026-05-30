// components/Select.tsx
import {
    FieldError,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";

type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    name: string;
    options: Option[];
    readonly?: boolean;
    required?: boolean;
    placeholder?: string;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
};

const Select = ({
    label,
    name,
    options,
    readonly,
    required,
    placeholder = "Select an option",
    register,
    registerOptions,
    error,
}: Props) => {
    return (
        <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
            <label
                htmlFor={name}
                className="text-[10px] sm:text-xs md:text-sm text-black"
            >
                {label} {required && <span className="text-[#DC2626]">*</span>}
            </label>

            <select
                id={name}
                {...register(name, registerOptions)}
                disabled={readonly}
                className={`
                    border
                    rounded-md
                    py-2
                    sm:py-2.5
                    md:py-3
                    px-3
                    sm:px-4
                    md:px-5
                    text-[10px]
                    sm:text-xs
                    md:text-sm
                    outline-none
                    transition

                    ${readonly
                        ? "bg-[#F5F5F5] text-[#737373] cursor-not-allowed"
                        : "bg-white"
                    }

                    ${error
                        ? "border-[#E24B4A] bg-[#FFF5F5] text-[#A32D2D]"
                        : "border-[#E8E8E8]"
                    }
                `}
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <span className="text-[#E24B4A] text-[8px] sm:text-[10px] md:text-xs">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export default Select;