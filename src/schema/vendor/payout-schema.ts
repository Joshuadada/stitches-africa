import { z } from "zod";

export const addPayoutSchema = z.object({
    bank: z
        .string()
        .min(1, "Please select a bank"),

    accountNumber: z
        .string()
        .min(1, "Account number is required")
        .regex(/^\d{10}$/, "Account number must be 10 digits"),

    accountName: z
        .string()
        .min(1, "Account name is required"),
});

export type AddPayoutSchemaType = z.infer<typeof addPayoutSchema>;