import { z } from "zod";

export const emailOtpSchema = z.object({
    otp: z
        .string()
        .length(6, "Please enter the 6-digit code")
        .regex(/^\d{6}$/, "Code must contain only numbers"),
});

export type EmailOtpFormData = z.infer<typeof emailOtpSchema>;
