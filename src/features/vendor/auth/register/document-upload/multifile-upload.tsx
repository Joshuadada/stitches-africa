import { useRef, useCallback } from "react";
import { FileRow } from "./file-role";
import Image from "next/image";

type FileStatus = "uploaded" | "failed";

interface TrackedFile {
  id: string;
  file: File;
  status: FileStatus;
  errorMessage?: string;
}

// New props shape
interface MultiFileUploadProps {
    files: TrackedFile[];
    onAdd: (valid: File[], failed: Array<{ file: File; errorMessage: string }>) => void;
    onRemove: (id: string) => void;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export const MultiFileUpload = ({ files, onAdd, onRemove }: MultiFileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const processFiles = useCallback(
        (fileList: FileList) => {
            const valid: File[] = [];
            const failed: Array<{ file: File; errorMessage: string }> = [];

            Array.from(fileList).forEach((file) => {
                if (file.size > MAX_SIZE) {
                    failed.push({ file, errorMessage: "File exceeds the 10MB size limit" });
                } else {
                    valid.push(file);
                }
            });

            onAdd(valid, failed);
        },
        [onAdd]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
        },
        [processFiles]
    );

    return (
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {files.map((tracked) => (
                <FileRow key={tracked.id} tracked={tracked} onRemove={onRemove} />
            ))}

            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => inputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-4 py-4 sm:py-5 md:py-6 lg:py-7.5 border border-dashed border-[#d5cdc4] rounded-2xl cursor-pointer hover:border-black transition-colors"
            >
                <Image src={"/svgs/upload-icon-2.svg"} alt="upload icon" height={18} width={13} />
                <span className="text-[10px] md:text-xs lg:text-sm text-[#A3A3A3]">
                    {files.length === 0
                        ? "Upload file — drag & drop or browse"
                        : "Add more files — drag & drop or browse"}
                </span>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                className="hidden"
                onChange={(e) => {
                    if (e.target.files?.length) {
                        processFiles(e.target.files);
                        e.target.value = "";
                    }
                }}
            />
        </div>
    );
};