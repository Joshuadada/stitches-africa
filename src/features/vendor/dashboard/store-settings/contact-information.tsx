import { FieldErrors, UseFormRegister } from "react-hook-form";
import { StoreSettingsFormData } from ".";

type ContactInformationProps = {
    register: UseFormRegister<StoreSettingsFormData>;
    errors?: FieldErrors<StoreSettingsFormData>;
};

const FIELDS = [
    { name: "address" as const, type: "text",  placeholder: "Studio address" },
    { name: "email"   as const, type: "email", placeholder: "Email address" },
    { name: "phone"   as const, type: "tel",   placeholder: "Phone number" },
];

const ContactInformation = ({ register, errors }: ContactInformationProps) => (
    <section>
        <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">Contact information</p>
        <div className="space-y-2">
            {FIELDS.map(({ name, type, placeholder }) => {
                const error = errors?.[name];

                return (
                    <div key={name}>
                        <input
                            {...register(name)}
                            type={type}
                            placeholder={placeholder}
                            className={`w-full border rounded-lg px-3.5 py-3 text-sm outline-none transition ${error ? "border-[#E24B4A] bg-[#FFF5F5] text-[#A32D2D]" : "border-[#D4CFC9] text-[#1F1B17] focus:border-[#B5894A]"
                                }`}
                        />
                        {error && (
                            <span className="text-[#E24B4A] text-xs mt-1 block">{error.message}</span>
                        )}
                    </div>
                );
            })}
        </div>
    </section>
);

export default ContactInformation;