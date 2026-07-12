import { z } from "zod";

export const checkoutSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required"),

    streetAddress: z
        .string()
        .min(1, "Street address is required"),

    city: z
        .string()
        .min(1, "City is required"),

    country: z
        .string()
        .min(1, "Country is required"),

    shippingMethod: z
        .string()
        .min(1, "Please select a shipping method"),

    paymentType: z
        .string()
        .min(1, "Please select a payment method"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
