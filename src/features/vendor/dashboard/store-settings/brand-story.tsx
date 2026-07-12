import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";
import { StoreSettingsFormData } from ".";

type BrandStoryProps = {
    register: UseFormRegister<StoreSettingsFormData>;
    watch: UseFormWatch<StoreSettingsFormData>;
    error?: FieldError;
};

const BrandStory = ({ register, watch, error }: BrandStoryProps) => {
    const value = watch("brandStory");

    return (
        <section>
            <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">Brand story</p>
            <div className="relative">
                <textarea
                    {...register("brandStory")}
                    maxLength={500}
                    rows={4}
                    className={`w-full border rounded-lg px-3.5 py-3 text-sm resize-none outline-none transition font-sans leading-relaxed ${error ? "border-[#E24B4A] bg-[#FFF5F5] text-[#A32D2D]" : "border-[#D4CFC9] text-[#1F1B17] focus:border-[#B5894A]"
                        }`}
                />
                <span className="absolute bottom-2.5 right-3 text-[11px] text-[#8A8278]">
                    {value?.length ?? 0} / 500
                </span>
            </div>
            {error && (
                <span className="text-[#E24B4A] text-xs mt-1.5 block">{error.message}</span>
            )}
        </section>
    );
};

export default BrandStory;