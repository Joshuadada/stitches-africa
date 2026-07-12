"use client"

import { useState } from "react"

const CoverUpload = ({
    onChange,
    error,
}: {
    onChange: (file: File | null) => void
    error?: string
}) => {
    const [preview, setPreview] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        setFileName(file?.name ?? null)
        setPreview(file ? URL.createObjectURL(file) : null)
        onChange(file)
    }

    return (
        <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2">
            <label className="text-[10px] sm:text-xs md:text-sm text-black">
                Cover image <span className="text-[#DC2626]">*</span>
            </label>
            <p className="text-[#9A9182] text-[8px] md:text-[10px] lg:text-xs">
                The banner shown at the top of the collection page
            </p>

            <label
                className={`rounded-xl border border-dashed p-6 flex items-center justify-center h-40 cursor-pointer transition ${error ? "border-[#E24B4A] bg-[#FFF5F5]" : "border-[#B5863C] hover:bg-[#FAF7F2]"
                    }`}
            >
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                {preview ? (
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-28 rounded-md overflow-hidden bg-[#F3EFEA]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
                        </div>
                        <p className="text-sm font-medium text-[#262626]">{fileName}</p>
                    </div>
                ) : (
                    <span className="text-[#B5894A] text-sm">+ Add cover image</span>
                )}
            </label>
            {error && <p className="text-[#E24B4A] text-xs">{error}</p>}
        </div>
    )
}

export default CoverUpload
