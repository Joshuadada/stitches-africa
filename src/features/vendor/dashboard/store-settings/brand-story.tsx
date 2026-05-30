import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { StoreSettingsFormData } from ".";

type BrandStoryProps = {
    register: UseFormRegister<StoreSettingsFormData>;
    watch: UseFormWatch<StoreSettingsFormData>;
};

const BrandStory = ({ register, watch }: BrandStoryProps) => {
    const value = watch("brandStory");

    return (
        <section>
            <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">Brand story</p>
            <div className="relative">
                <textarea
                    {...register("brandStory")}
                    maxLength={500}
                    rows={4}
                    className="w-full border border-[#D4CFC9] rounded-lg px-3.5 py-3 text-sm text-[#1F1B17] resize-none outline-none transition focus:border-[#B5894A] font-sans leading-relaxed"
                />
                <span className="absolute bottom-2.5 right-3 text-[11px] text-[#8A8278]">
                    {value?.length ?? 0} / 500
                </span>
            </div>
        </section>
    );
};

export default BrandStory;