'use client'

import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, Box, Link as MuiLink, Alert, Tabs, Tab } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailLoginSchema, PhoneLoginSchema } from '@/src/app/validation';  // Assuming you've imported the schema

import { signInAction } from '../signIn.action';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// SignIn Form Component
export function SignInForm() {
    const router = useRouter();

    type AlertSeverity = 'success' | 'error' | 'info' | 'warning';
    const [message, setMessage] = useState<{ text: string; type: AlertSeverity }>({ text: '', type: 'info' });

    const emailForm = useForm({
        resolver: zodResolver(EmailLoginSchema),
    });

    const phoneForm = useForm({
        resolver: zodResolver(PhoneLoginSchema),
    });

    //
    const [tabIndex, setTabIndex] = useState(0);
    const [codeSent, setCodeSent] = useState(false); // <-- Toggle this to show/hide code input

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setMessage({ text: '', type: 'info' }); // clear message on tab switch
        setTabIndex(newValue);
    };

    // Submit handler
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const onEmailSubmit = async (data: any) => {
        const result = await handleLogin({ ...data, provider: 'email' });
        setMessage({ text: `${result?.status}: ${result?.message}`, type: result?.type as AlertSeverity }); // Set the cookies after successful sign-in
        if (result?.type === 'success') {
            router.push('/settings');  // <-- Redirect to settings
        }
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const onPhoneSubmit = async (data: any) => {
        if (!codeSent) {
            // Simulate sending SMS code
            const result = await handleLogin({ ...data, provider: 'phone' });

            if (result?.type === 'success') {
                setCodeSent(true);
                setMessage({ text: 'Code sent. Please check your phone.', type: 'success' });
            } else {
                setMessage({ text: result?.message, type: result?.type as AlertSeverity });
            }
        } else {
            // Actual login with phone + code
            const result = await handleLogin({ ...data, provider: 'phone' }); // Set the cookies after successful sign-in
            if (result?.type === 'success') {
                router.push('/settings');  // <-- Redirect to settings
            }
        }

    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleLogin = async (data: any) => {
        setMessage({ text: '', type: 'info' });
        const payload = data.provider === 'email'
            ? { provider: 'email', payload: { email: data.email, password: data.password } }
            : { provider: 'phone', payload: { phoneNumber: data.phoneNumber } };
        const result = await signInAction(payload);
        return result;
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            {/* Tabs for login method */}
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="Email Login" />
                <Tab label="SMS Login" />
            </Tabs>
            {/* Email Login Form */}
            {tabIndex === 0 && (
                <Box
                    component="form"
                    onSubmit={emailForm.handleSubmit(onEmailSubmit)}  // use handleSubmit, which prevents default behavior
                    sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}
                >
                    {/* Email Field */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            label="Email"
                            {...emailForm.register('email')}  // Register the email field with react-hook-form
                            error={!!emailForm.formState.errors.email}  // Show error if email is invalid
                            helperText={emailForm.formState.errors.email ? (typeof emailForm.formState.errors.email.message === 'string' ? emailForm.formState.errors.email.message : '') : ''}  // Display error message if exists
                        />
                    </FormControl>

                    {/* Password Field */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            {...emailForm.register('password')}  // Register the password field
                            error={!!emailForm.formState.errors.password}  // Show error if password is invalid
                            helperText={emailForm.formState.errors.password ? (typeof emailForm.formState.errors.password.message === 'string' ? emailForm.formState.errors.password.message : '') : ''}  // Display error message if exists
                        />
                    </FormControl>

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary" sx={{
                        width: 'fit-content !important', // Set the width to fit the content (button text)
                        padding: '8px 20px',  // Optional: Adds some padding to make the button more spacious
                    }} >
                        Sign In
                    </Button>
                    {/* Links for sign-up and forgot password */}
                    <Box sx={{ mt: 2 }}>
                        <MuiLink component={Link} href="/sign-up" sx={{ display: 'block', mt: 1 }}>
                            Create account
                        </MuiLink>
                        <MuiLink component={Link} href="/forgot-password" sx={{ display: 'block', mt: 1 }}>
                            Forgot password?
                        </MuiLink>
                    </Box>
                </Box>
            )}
            {/* SMS Login Form */}
            {tabIndex === 1 && (
                <Box component="form" onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} sx={{ mt: 2 }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            label="Phone Number"
                            type="tel"
                            placeholder="+1 555-123-4567"
                            {...phoneForm.register('phoneNumber')}
                            error={!!phoneForm.formState.errors.phoneNumber}  // Show error if email is invalid
                            helperText={phoneForm.formState.errors.phoneNumber ? (typeof phoneForm.formState.errors.phoneNumber.message === 'string' ? phoneForm.formState.errors.phoneNumber.message : '') : ''}  // Display error message if exists
                        />
                    </FormControl>


                    {codeSent && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                label="Verification Code"
                                type="text"
                                {...phoneForm.register('code')}
                                error={!!phoneForm.formState.errors.code}
                                helperText={phoneForm.formState.errors.code?.message as string}
                            />
                        </FormControl>
                    )}

                    <Button type="submit" variant="contained" color="primary">
                        {codeSent ? 'Verify Code' : 'Send Code'}
                    </Button>
                </Box>
            )
            }
            {/* Display messages */}
            {
                message.text && (
                    <Alert sx={{ mt: 2 }} severity={message.type}>
                        {message.text}
                    </Alert>
                )
            }
        </Box >
    );
}

