import { z } from "zod";

export const manualOrderSchema = z.object({
    customerName: z
        .string()
        .min(1, "Customer name is required"),

    customerEmail: z
        .string()
        .min(1, "Customer email is required")
        .email("Please enter a valid email address"),

    vendor: z
        .string()
        .min(1, "Please select a vendor"),

    product: z
        .string()
        .min(1, "Please select a product"),

    shippingAddress: z
        .string()
        .min(1, "Shipping address is required"),

    orderNote: z
        .string()
        .optional(),
});

export type ManualOrderFormData = z.infer<typeof manualOrderSchema>;
