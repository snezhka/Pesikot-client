'use server'

import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { setCookies } from "../utils/cookiesHandling";

export async function signInAction(data: any) {
    console.log("Data", data);
    try {
        const response = await fetch('http://localhost:3001/sign-in',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    data
                )
            });
        console.log("res111", response);
        const tokens = await response.json();
        console.log("result2222", tokens);
        if (response.ok) {
            setCookies(tokens);
            return {
                status: response.status,
                message: 'Login successful',
                type: 'success',
                tokens: tokens,
            };
        } else {
            // If the response is not OK, get the error message from the response
            return { status: response.status, message: 'Error during login', type: 'error' };
        }

    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    catch (err: any) {
        // Return error status and message in case of failure
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: err.message || 'Something went wrong', type: 'error' };
    }
}

