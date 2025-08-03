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
import { signOut } from '../signOut.action';
import { redirect } from 'next/navigation';

export function Settings() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleLogOut = async (e: any) => {
        e.preventDefault();
        await signOut();
    };


    return (
        <Box
            component="form"
            onSubmit={handleLogOut}
            sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}
        >
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Log out
            </Button>
        </Box>
    );
}
