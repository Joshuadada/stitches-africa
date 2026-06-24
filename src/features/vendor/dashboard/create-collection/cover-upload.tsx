"use client"

import React, { useState } from "react"

const CoverUpload = ({ onChange }: { onChange: (f: File | null) => void }) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setPreview(f ? URL.createObjectURL(f) : null)
    onChange(f)
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
    onChange(null)
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2">
        <label className="block text-[10px] sm:text-xs md:text-sm text-black">
          Cover image <span className="text-[#DC2626]">*</span>
        </label>
        <p className="text-[#9A9182] text-[8px] md:text-[10px] lg:text-xs">
          The banner shown at the top of the collection page
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-[#B5863C] p-6 flex items-center justify-center h-52">
        {file ? (
          <div className="flex items-center gap-4">
            <div className="h-24 w-36 rounded-md overflow-hidden bg-[#F3EFEA] flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-[#C7B99B]">Preview</span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-[#6A5D4D]">{Math.round(file.size / 1024)} KB</p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="ml-4 text-sm text-[#6A5D4D] hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="text-[#B5894A]">+ Add cover image</div>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        )}
      </div>
    </div>
  )
}

export default CoverUpload