import { UseFormRegister } from "react-hook-form";
import { StoreSettingsFormData } from ".";

type ContactInformationProps = {
    register: UseFormRegister<StoreSettingsFormData>;
};

const FIELDS = [
    { name: "address" as const, type: "text",  placeholder: "Studio address" },
    { name: "email"   as const, type: "email", placeholder: "Email address" },
    { name: "phone"   as const, type: "tel",   placeholder: "Phone number" },
];

const ContactInformation = ({ register }: ContactInformationProps) => (
    <section>
        <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">Contact information</p>
        <div className="space-y-2">
            {FIELDS.map(({ name, type, placeholder }) => (
                <input
                    key={name}
                    {...register(name)}
                    type={type}
                    placeholder={placeholder}
                    className="w-full border border-[#D4CFC9] rounded-lg px-3.5 py-3 text-sm text-[#1F1B17] outline-none transition focus:border-[#B5894A]"
                />
            ))}
        </div>
    </section>
);

export default ContactInformation;