import { z } from "zod";

export const addProductSchema = z.object({
    category: z.string().min(1, "Category is required"),

    productTitle: z
        .string()
        .min(2, "Product title is required"),

    // productCode: z
    //     .string()
    //     .min(2, "Product code is required"),

    brandId: z
        .string()
        .min(1, "Select a brand"),

    productType: z
        .string()
        .min(1, "Product type is required"),

    enableAiTryOn: z.boolean(),

    summary: z
        .string()
        .min(2, "Summary must be at least 10 characters"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),

    basePrice: z
        .string()
        .min(1, "Base price is required")
        .refine((value) => !isNaN(Number(value.replace(/,/g, ""))), {
            message: "Enter a valid price",
        }),

    sizes: z
        .array(
            z.object({
                size: z.string(),
                quantity: z.number(),
            })
        )
        .min(1, "Select at least one size"),

    images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});

export type AddProductFormData = z.infer<
    typeof addProductSchema
>;