'use server'

import { StatusCodes } from 'http-status-codes';

export async function forgotPasswordAction(rawFormData: FormData) {
    console.log("LOG", JSON.stringify(rawFormData));
    try {
        const response = await fetch('http://localhost:3001/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'host': 'http://localhost:3000'
            },
            body: JSON.stringify(rawFormData),
            credentials: 'include',
        });
        console.log("Forgot Pass", response);

        // Check if the response was successful
        if (response.ok) {
            // If the request was successful, return success status and message
            return { status: StatusCodes.OK, message: "Reset password instructions are sent to your email", type: 'success' };
        } else {
            let errorMessage = 'Error during password reset';
            try {
                const errorResponse = await response.json();
                errorMessage = errorResponse.message || 'Error during password reset';
            } catch (jsonErr) {
                console.error('Error parsing error response:', jsonErr);
            }

            return {
                status: response.status,
                message: errorMessage,
                type: 'error',
            };
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
        // Return error status and message in case of failure
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: err.message || 'Something went wrong', type: 'error' };
    }
}
