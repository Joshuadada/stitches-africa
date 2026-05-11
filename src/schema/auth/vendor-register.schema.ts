// schema.ts
import { z } from "zod";

export const registerBusinessDetailsSchema = z.object({
    businessName: z
        .string()
        .min(2, "Business name must be at least 2 characters")
        .max(100, "Business name must be less than 100 characters"),

    cacRegistrationNumber: z
        .string()
        .min(1, "CAC registration number is required")
        .regex(
            /^(BN|RC|IT|LP|LLP)\d{6,7}$/i,
            "Enter a valid CAC number (e.g. RC1234567 or BN123456)"
        ),

    physicalBusinessAddress: z
        .string()
        .min(2, "Business address must be at least 2 characters"),

    city: z
        .string()
        .min(1, "City is required"),

    state: z
        .string()
        .min(1, "State is required"),

    yearsInOperation: z
        .number()
        .int("Must be a whole number")
        .min(0, "Cannot be negative")
        .max(200, "Please enter a valid number of years"),

    businessCategory: z
        .array(z.string().min(1))
        .min(1, "Select at least one business category"),

    contactName: z
        .string()
        .min(2, "Contact name must be at least 2 characters")
        .max(100, "Contact name must be less than 100 characters"),

    businessEmail: z
        .string()
        .email("Enter a valid email address"),

    phoneNumber: z
        .string()
        .regex(
            /^\+?[1-9]\d{6,14}$/,
            "Enter a valid phone number"
        ),

    whatsappNumber: z
        .string()
        .regex(
            /^\+?[1-9]\d{6,14}$/,
            "Enter a valid WhatsApp number"
        ),
});

export type RegisterBusinessDetailsFormData = z.infer<typeof registerBusinessDetailsSchema>;