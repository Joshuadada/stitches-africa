import { z } from "zod";

export const vendorDocumentUploadSchema = z
    .object({
        additionalFile: z.instanceof(File).nullable(),
        govIdFiles: z.array(z.any()).min(1, "At least one ID document is required."),
        portfolioFiles: z.array(z.any()).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.additionalFile === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "This document is required.",
                path: ["additionalFile"],
            });
        }
    });

export type VendorDocumentUploadFormData = z.infer<typeof vendorDocumentUploadSchema>;
