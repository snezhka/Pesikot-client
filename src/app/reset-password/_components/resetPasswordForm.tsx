'use client'

import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, Box, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/src/app/validation'; // Schema for validating reset password form

import { resetPasswordAction } from '../resetPassword.action';
import { useSearchParams } from 'next/navigation';


// ResetPasswordForm Component
export function ResetPasswordForm() {
    type AlertSeverity = 'success' | 'error' | 'info' | 'warning';
    const [message, setMessage] = useState<{ text: string; type: AlertSeverity }>({ text: '', type: 'info' });
    const [resetToken, setResetToken] = useState<string | null>(null); // Store the reset token
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ResetPasswordSchema),
    });
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('reset-token'); // Extract the reset token

        if (token) {
            setResetToken(token);  // Store it in the state
        } else {
            setMessage({ text: 'Reset token is missing or invalid', type: 'error' });
        }
    }, [searchParams]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        if (!resetToken) {
            setMessage({ text: 'Reset token is missing or invalid', type: 'error' });
            return;
        }
        try {
            // setMessage('');
            await resetPasswordAction(resetToken, data);
            setMessage({ text: 'Password updated successfully!', type: 'success' });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
            setMessage({ text: "Something went wrong", type: 'error' });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}
        >
            {/* New Password Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="New Password"
                    type="password"
                    {...register('newPassword')}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword ? (typeof errors.newPassword.message === 'string' ? errors.newPassword.message : '') : ''}
                />
            </FormControl>

            {/* Confirm New Password Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Confirm New Password"
                    type="password"
                    {...register('newPasswordConfirm')}
                    error={!!errors.newPasswordConfirm}
                    helperText={errors.newPasswordConfirm ? (typeof errors.newPasswordConfirm.message === 'string' ? errors.newPasswordConfirm.message : '') : ''} />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" sx={{
                width: 'fit-content !important', // Set the width to fit the content (button text)
                padding: '8px 20px',  // Optional: Adds some padding to make the button more spacious
            }}>
                Save New Password
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

