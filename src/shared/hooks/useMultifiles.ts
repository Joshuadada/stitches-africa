import { useState, useCallback } from "react";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type))
        return "Invalid file type. Please upload a PDF, JPG, or PNG.";
    if (file.size > MAX_SIZE_BYTES)
        return `File exceeds the 10MB limit (${formatFileSize(file.size)}). Please upload a PDF, JPG, or PNG under 10MB.`;
    return null;
};

type FileStatus = "uploaded" | "failed";

interface TrackedFile {
    id: string;
    file: File;
    status: FileStatus;
    errorMessage?: string;
}

export const useMultiFiles = () => {
    const [files, setFiles] = useState<TrackedFile[]>([]);

    const addFiles = useCallback((fileList: FileList) => {
        const newEntries: TrackedFile[] = Array.from(fileList).map((file) => {
            const error = validateFile(file);
            return {
                id: `${file.name}-${Date.now()}-${Math.random()}`,
                file,
                status: error ? "failed" : "uploaded",
                errorMessage: error ?? undefined,
            };
        });
        setFiles((prev) => [...prev, ...newEntries]);
    }, []);

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    return { files, addFiles, removeFile };
};