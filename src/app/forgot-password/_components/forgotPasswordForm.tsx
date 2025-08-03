'use client'

import React, { useState } from 'react';
import { TextField, Button, FormControl, Box, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema } from '@/src/app/validation'; // Assume this schema is properly validated with Zod

import { forgotPasswordAction } from '../forgotPassword.action';

// ForgotPasswordForm Component
export function ForgotPasswordForm() {
    type AlertSeverity = 'success' | 'error' | 'info' | 'warning';
    const [message, setMessage] = useState<{ text: string; type: AlertSeverity }>({ text: '', type: 'info' });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        const result = await forgotPasswordAction(data);
        setMessage({ text: `${result.status}: ${result.message}`, type: result.type as AlertSeverity });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}
        >
            {/* Email Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Email"
                    {...register('email')}  // Register the email field with react-hook-form
                    error={!!errors.email}  // Show error if email is invalid
                    helperText={errors.email ? (typeof errors.email.message === 'string' ? errors.email.message : '') : ''}  // Display error message if exists
                />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" sx={{
                width: 'fit-content !important', // Set the width to fit the content (button text)
                padding: '8px 20px',  // Optional: Adds some padding to make the button more spacious
            }}>
                Reset Password
            </Button>

            {/* Display messages */}
            {message.text && (
                <Alert sx={{ mt: 2 }} severity={message.type}>
                    {message.text}
                </Alert>
            )}
        </Box>
    );
}
