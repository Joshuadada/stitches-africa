import { z } from "zod";

export const storeSettingsSchema = z.object({
    brandStory: z
        .string()
        .min(1, "Brand story is required")
        .max(500, "Brand story must be 500 characters or fewer"),

    address: z
        .string()
        .min(1, "Studio address is required"),

    email: z
        .string()
        .min(1, "Email address is required")
        .email("Please enter a valid email address"),

    phone: z
        .string()
        .min(1, "Phone number is required"),

    emailNotifications: z.boolean(),
    inAppNotifications: z.boolean(),
});

export type StoreSettingsFormData = z.infer<typeof storeSettingsSchema>;
