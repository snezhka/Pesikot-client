'use client'

import { z } from 'zod'

// SignUp Schema
export const SignupFormSchema = z.object({
    username: z
        .string()
        .trim()
        .optional()
        .refine((val) => val === undefined || val.trim().length === 0 || (val.length >= 3 && val.length <= 10), {
            message: 'Username must be between 3 and 10 characters long.',
        }),
    email: z
        .string()
        .email({ message: 'Please enter a valid email.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Password must contain at least one special character.',
        })
        .trim(),
    passwordConfirm: z
        .string()
})
    .superRefine(({ password, passwordConfirm }, ctx) => {
        // Access parent object via `ctx.parent`
        if (password != passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match.",
                path: ['passwordConfirm'], // Attach error to passwordConfirm field
            });
        }

    });


// SignIn Schema (Email and Password only)
export const EmailLoginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please enter a valid email.' }) // Valid email format
        .trim(),  // Remove leading/trailing spaces
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' }) // Password length check
        .trim(),  // Remove leading/trailing spaces
});

export const PhoneLoginSchema = z.object({
    phoneNumber: z.string().min(10, 'Please enter a valid phone number').trim(),
    code: z.string().min(4, 'Code is required').optional()
});

// Forgot Password Schema (only email)
export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please enter a valid email.' }) // Valid email format
        .trim()  // Remove leading/trailing spaces
        .nonempty({ message: 'Email is required.' }), // Ensure email is provided
});

// Reset Password Schema (new password and confirm password)
export const ResetPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Password must contain at least one special character.',
        })
        .trim(),
    newPasswordConfirm: z
        .string()
})
    .superRefine(({ newPassword, newPasswordConfirm }, ctx) => {
        debugger
        // Access parent object via `ctx.parent`
        if (newPassword != newPasswordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match.",
                path: ['newPasswordConfirm'], // Attach error to passwordConfirm field
            });
        }
    });