import { z } from "zod";

export const addProductSchema = z.object({
    category: z.string().min(1, "Category is required"),

    productTitle: z
        .string()
        .min(2, "Product title is required"),

    productCode: z
        .string()
        .min(2, "Product code is required"),

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

    images: z
        .array(z.instanceof(File))
        .min(1, "At least one product image is required"),
});

export type AddProductFormData = z.infer<
    typeof addProductSchema
>;