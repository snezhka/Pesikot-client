'use client'

import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from "@/node_modules/@mui/material/index";
import { signInAction } from "../signIn.action";

export function SignInForm() {
    const handler = async () => { await signInAction() };
    return (
        //Add Form and remove section
        <FormControl className="flex items-center flex-col gap-x-1 justify-center w-full h-screen gap-4">
            <Input placeholder="Email or username" required />
            <Input placeholder="Password"
                type="password"
                autoComplete="current-password"
                required />
            <Button variant="outlined" color="primary" onClick={handler}>
                Login
            </Button>
        </FormControl>
    );
}