import { z } from "zod";

export const vendorReviewApplicationSchema = z.object({
    confirmed: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must confirm before submitting your application.",
        }),
});

export type VendorReviewApplicationFormData = z.infer<typeof vendorReviewApplicationSchema>;
