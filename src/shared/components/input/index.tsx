// components/Input.tsx
import {
    FieldError,
    RegisterOptions,
    UseFormRegister,
  } from "react-hook-form";
  
  type Props = {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
  };
  
  const Input = ({
    label,
    name,
    type = "text",
    required,
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
          {label} {required && <span>*</span>}
        </label>
  
        <input
          id={name}
          type={type}
          {...register(name, registerOptions)}
          className={`border rounded-md py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-[10px] sm:text-xs md:text-sm outline-none transition
          ${
            error
              ? "border-[#E24B4A] bg-[#FFF5F5] text-[#A32D2D]"
              : "border-[#E8E8E8]"
          }`}
        />
  
        {error && (
          <span className="text-[#E24B4A] text-[8px] sm:text-[10px] md:text-xs">
            {error.message}
          </span>
        )}
      </div>
    );
  };
  
  export default Input;