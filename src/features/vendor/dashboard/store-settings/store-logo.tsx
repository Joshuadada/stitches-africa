"use client";

import { useRef } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

type StoreLogoProps = {
    preview: string | null;
    onUpload: (url: string) => void;
};

const StoreLogo = ({ preview, onUpload }: StoreLogoProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onUpload(URL.createObjectURL(file));
    };

    return (
        <section>
            <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">Store logo</p>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="w-18 h-18 rounded-[10px] border-[1.5px] border-dashed border-[#D9CDB7] bg-[#F0E8D6] flex items-center justify-center shrink-0 hover:border-[#B5894A] transition overflow-hidden cursor-pointer"
                >
                    {preview
                        ? <Image src={preview} alt="Logo" width={72} height={72} className="w-full h-full object-cover" />
                        : <Plus size={20} className="text-[#B98B5C]" />
                    }
                </button>
                <div>
                    <p className="text-sm font-medium text-[#1F1B17] mb-0.5">Upload logo</p>
                    <p className="text-xs text-[#8A8278]">PNG or JPG, square. Recommended 400×400px.</p>
                </div>
                <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleChange} />
            </div>
        </section>
    );
};

export default StoreLogo;