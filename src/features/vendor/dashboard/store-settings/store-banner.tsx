"use client";

import { useRef } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

type StoreBannerProps = {
    preview: string | null;
    onUpload: (url: string) => void;
};

const StoreBanner = ({ preview, onUpload }: StoreBannerProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onUpload(URL.createObjectURL(file));
    };

    return (
        <section>
            <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">Banner image</p>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-full h-25 rounded-[10px] border-[1.5px] border-dashed border-[#D9CDB7] bg-[#F0E8D6] flex flex-col items-center justify-center gap-1.5 hover:border-[#B5894A] transition cursor-pointer overflow-hidden"
            >
                {preview
                    ? <Image src={preview} alt="Banner" width={616} height={100} className="w-full h-full object-cover" />
                    : <>
                        <Plus size={20} className="text-[#B98B5C]" />
                        <span className="text-xs text-[#A89880]">Upload banner · Recommended 1600×400px</span>
                      </>
                }
            </button>
            <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleChange} />
        </section>
    );
};

export default StoreBanner;