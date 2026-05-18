// useMultiFiles.ts
import { useState, useCallback } from "react";

type FileStatus = "uploaded" | "failed";

interface TrackedFile {
    id: string;
    file: File;
    status: FileStatus;
    errorMessage?: string;
}

export const useMultiFiles = () => {
    const [files, setFiles] = useState<TrackedFile[]>([]);

    const addFiles = useCallback(
        (valid: File[], failed: Array<{ file: File; errorMessage: string }>) => {
            const newValid: TrackedFile[] = valid.map((file) => ({
                id: crypto.randomUUID(),
                file,
                status: "uploaded",
            }));

            const newFailed: TrackedFile[] = failed.map(({ file, errorMessage }) => ({
                id: crypto.randomUUID(),
                file,
                status: "failed",
                errorMessage,
            }));

            setFiles((prev) => [...prev, ...newValid, ...newFailed]);
        },
        []
    );

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    return { files, addFiles, removeFile };
};