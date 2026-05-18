import { Paperclip, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

type FileStatus = "uploaded" | "failed";

interface TrackedFile {
    id: string;
    file: File;
    status: FileStatus;
    errorMessage?: string;
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

export const FileRow = ({
    tracked,
    onRemove,
}: {
    tracked: TrackedFile;
    onRemove: (id: string) => void;
}) => {
    const { id, file, status, errorMessage } = tracked;
    const isSuccess = status === "uploaded";

    return (
        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-3.5">
            <div
                className={`flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-4.5 rounded-2xl border ${isSuccess
                    ? "bg-[#F0FDF4] border-[#086547]"
                    : "bg-[#FFF5F5] border-[#E24B4A]"
                    }`}
            >
                {/* Thumbnail / icon */}
                <div className={`w-5 sm:w-6 md:w-7 lg:w-9 h-5 sm:h-6 md:h-7 lg:h-9 rounded ${isSuccess ? "bg-black" : "bg-[#E24B4A]"}`}></div>

                {/* Name + size */}
                <div className="flex flex-col flex-1 min-w-0">
                    <span
                        className={`text-[10px] md:text-xs lg:text-sm font-medium truncate ${isSuccess ? "text-black" : "text-[#E24B4A]"
                            }`}
                    >
                        {file.name}
                    </span>
                    <span className={`text-[8px] md:text-[10px] lg:text-xs ${isSuccess ? "text-[#737373]" : "text-[#E24B4A]"}`}>
                        {formatFileSize(file.size)}&nbsp;–&nbsp;
                        {isSuccess ? "Uploaded successfully" : "File too large"}
                    </span>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-1 shrink-0">
                    {isSuccess ? (
                        <>
                            <Image src={"/svgs/success-icon.svg"} alt="success icon" height={16} width={16} />
                            <span className="text-[8px] md:text-[10px] lg:text-xs text-[#1D9E75] font-bold">Uploaded</span>
                        </>
                    ) : (
                        <>
                            <Image src={"/svgs/failure-icon.svg"} alt="failure icon" height={16} width={16} />
                            <span className="text-[8px] md:text-[10px] lg:text-xs text-[#E24B4A] font-bold">Upload failed</span>
                        </>
                    )}
                </div>

                {/* Remove */}
                <button
                    type="button"
                    onClick={() => onRemove(id)}
                    className="text-[8px] md:text-[10px] lg:text-xs text-[#A3A3A3] hover:text-black font-bold underline shrink-0 ml-2 cursor-pointer"
                >
                    Remove
                </button>
            </div>

            {/* Inline error message */}
            {!isSuccess && errorMessage && (
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 mt-1.5">
                    <AlertCircle className="w-2.5 sm:w-3 md:w-3.5 lg:w-4 h-2.5 sm:h-3 md:h-3.5 lg:h-4 text-[#E24B4A] shrink-0" />
                    <p className="text-[8px] md:text-[10px] lg:text-xs text-[#E24B4A] font-semibold">{errorMessage}</p>
                </div>
            )}
        </div>
    );
};