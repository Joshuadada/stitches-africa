// schema.ts
import { z } from "zod";

export const registerStartSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),

        phoneNumber: z
            .string()
            .regex(
                /^(0\d{10}|\+234\d{10})$/,
                "Enter a valid phone number"
            ),
    })

export type RegisterStartFormData = z.infer<typeof registerStartSchema>;

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
        .string()
        .regex(/^\d+$/, "Must be a whole number")
        .refine((val) => parseInt(val) <= 200, "Please enter a valid number of years"),

    businessCategory: z
        .array(z.string().min(1))
        .min(1, "Select at least one business category"),

    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(100, "First name must be less than 100 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(100, "Last name must be less than 100 characters"),

    businessEmail: z
        .string()
        .email("Enter a valid email address"),

    phoneNumber: z
        .string()
        .regex(
            /^(0\d{10}|\+234\d{10})$/,
            "Enter a valid phone number"
        ),

    whatsappNumber: z
        .string()
        .regex(
            /^(0\d{10}|\+234\d{10})$/,
            "Enter a valid WhatsApp number"
        ),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        ),

    confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        ),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export type RegisterBusinessDetailsFormData = z.infer<typeof registerBusinessDetailsSchema>;