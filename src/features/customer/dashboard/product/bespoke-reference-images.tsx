"use client"

import { useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import Accordion from "./accordion"
import { BespokeCustomizationFormData } from "@/schema/customer/bespoke-customization.schema"

const BespokeReferenceImages = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragging, setDragging] = useState(false)

    const { watch, setValue } = useFormContext<BespokeCustomizationFormData>()
    const files = watch("referenceImages") ?? []

    const addFiles = (incoming: FileList | null) => {
        if (!incoming) return
        const valid = Array.from(incoming).filter((f) =>
            ["image/jpeg", "image/png"].includes(f.type)
        )
        setValue("referenceImages", [...files, ...valid], { shouldValidate: true })
    }

    const removeFile = (index: number) =>
        setValue("referenceImages", files.filter((_, i) => i !== index), { shouldValidate: true })

    return (
        <Accordion title="Reference Images">
            {/* Drop zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 py-8 sm:py-10 cursor-pointer transition ${
                    dragging ? "border-[#B5894A] bg-[#FAF7F2]" : "border-[#E8E8E8] bg-white hover:border-[#A3A3A3]"
                }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                />

                {/* Upload icon */}
                <div className="h-10 w-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </div>

                <div className="text-center">
                    <p className="text-[#262626] text-[10px] sm:text-xs font-medium">
                        Drag photos here or click to browse
                    </p>
                    <p className="text-[#A3A3A3] text-[8px] sm:text-[10px] mt-0.5">JPG, PNG</p>
                </div>
            </div>

            {/* Preview thumbnails */}
            {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {files.map((file, idx) => (
                        <div key={idx} className="relative h-14 w-14 rounded-md overflow-hidden border border-[#E8E8E8]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover w-full h-full"
                            />
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFile(idx) }}
                                className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-black/60 text-white text-[8px] flex items-center justify-center cursor-pointer hover:bg-black transition"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </Accordion>
    )
}

export default BespokeReferenceImages
