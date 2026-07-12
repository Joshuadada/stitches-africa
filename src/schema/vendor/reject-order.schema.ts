import { z } from "zod";

export const rejectOrderSchema = z.object({
    reason: z
        .string()
        .min(1, "Please select a reason for rejection"),

    message: z
        .string()
        .optional(),
});

export type RejectOrderFormData = z.infer<typeof rejectOrderSchema>;
