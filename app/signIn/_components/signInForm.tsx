'use client'

// export function SignUpForm() {

//     return (
//         <form action={signUpAction}>
//             <FormControl className="flex items-center flex-col gap-x-1 justify-center w-full h-screen gap-4">
//                 <TextField placeholder="Email" name="email" type="email" variant="outlined" />
//                 <TextField placeholder="Username" name="username" variant="outlined" />
//                 <TextField placeholder="Password" name="password" type="password" variant="outlined" />
//                 <Input placeholder="Register" type="submit" />
//             </FormControl>
//         </form>
//     );
// }

// components/CustomForm.js
import React, { useState } from 'react';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { signInAction } from '../signIn.action';

export function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send data to the server (example)
        const response = await fetch('http://localhost:3001/sign-in', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        // If the server response contains a redirect, it may trigger itif (response.redirected) {
        console.log('Form submitted:', formData);
    };


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}
        >

            {/* Email Field */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </FormControl>

            {/* Age Select */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Password</InputLabel>
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </Box>
    );
}
