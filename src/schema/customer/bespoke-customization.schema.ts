import { z } from "zod";

export const bespokeCustomizationSchema = z.object({
    size: z
        .string()
        .min(1, "Please select a size"),

    unit: z
        .string()
        .min(1, "Unit is required"),

    hips: z.string().optional(),
    length: z.string().optional(),
    sleeves: z.string().optional(),
    waist: z.string().optional(),

    fabricTypes: z
        .array(z.string())
        .min(1, "Select at least one fabric type"),

    fabricNote: z.string().optional(),

    lining: z
        .string()
        .min(1, "Please select a lining option"),

    customerNote: z.string().optional(),

    referenceImages: z.array(z.instanceof(File)).optional(),
});

export type BespokeCustomizationFormData = z.infer<typeof bespokeCustomizationSchema>;
