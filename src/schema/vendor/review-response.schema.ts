import { z } from "zod";

export const reviewResponseSchema = z.object({
    response: z
        .string()
        .trim()
        .min(1, "Please write a response before submitting"),
});

export type ReviewResponseFormData = z.infer<typeof reviewResponseSchema>;
