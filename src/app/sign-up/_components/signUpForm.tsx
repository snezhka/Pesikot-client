'use client'

import { signUpAction } from '../signUp.action'
import React, { useState } from 'react';
import {
    TextField,
    Button,
    FormControl,
    Box,
    Alert,
    Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormSchema } from '@/src/app/validation';
import { useRouter } from 'next/navigation';


export function SignUpForm() {
    type AlertSeverity = 'success' | 'error' | 'info' | 'warning';
    const [message, setMessage] = useState<{ text: string; type: AlertSeverity }>({ text: '', type: 'info' });
    // Use react-hook-form for form management and validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SignupFormSchema)
    });
    const router = useRouter();

    // Submit handler
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const onSubmit = async (data: any) => {
        debugger;
        setMessage({ text: '', type: 'info' });
        const result = await signUpAction(data);
        setMessage({ text: `${result.status}: ${result.message}`, type: result.type as AlertSeverity });
        if (result.type === 'success') {
            router.push('/sign-in');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}  // use handleSubmit for validation and submission
            sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}
        >
            {/* Username Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Username"
                    {...register('username')}  // Register the username field with react-hook-form
                    error={!!errors.username}  // If there's an error, show it
                    helperText={errors.username ? (typeof errors.username.message === 'string' ? errors.username.message : '') : ''}  // Ensure string type for helperText
                />
            </FormControl>

            {/* Email Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Email"
                    {...register('email')}  // Register the email field
                    error={!!errors.email}  // Show error if email is invalid
                    helperText={errors.email ? (typeof errors.email.message === 'string' ? errors.email.message : '') : ''}  // Ensure string type for helperText
                />
            </FormControl>

            {/* Password Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Password"
                    type="password"
                    {...register('password')}  // Register the password field
                    error={!!errors.password}  // Show error if password is invalid
                    helperText={errors.password ? (typeof errors.password.message === 'string' ? errors.password.message : '') : ''}  // Ensure string type for helperText
                />
            </FormControl>

            {/* Password Confirm Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Password confirm"
                    type="password"
                    {...register('passwordConfirm')}  // Register the password field
                    error={!!errors.passwordConfirm}  // Show error if password is invalid
                    helperText={errors.passwordConfirm ? (typeof errors.passwordConfirm.message === 'string' ? errors.passwordConfirm.message : '') : ''}  // Ensure string type for helperText
                />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" sx={{
                width: 'fit-content !important', // Set the width to fit the content (button text)
                padding: '8px 20px',  // Optional: Adds some padding to make the button more spacious
            }}>
                Register
            </Button>
            {/* Links for sign-up and forgot password */}
            <Box sx={{ mt: 2 }}>
                <MuiLink component={Link} href="/sign-in" sx={{ display: 'block', mt: 1 }}>
                    Login
                </MuiLink>
                <MuiLink component={Link} href="/forgot-password" sx={{ display: 'block', mt: 1 }}>
                    Forgot password?
                </MuiLink>
            </Box>
            {/* Display messages */}
            {message.text && (
                <Alert sx={{ mt: 2 }} severity={message.type}>
                    {message.text}
                </Alert>
            )}
        </Box>
    );
}
