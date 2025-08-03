'use server'

import { StatusCodes } from "http-status-codes";

export async function signUpAction(rawFormData: FormData) {
    console.log("Form data", rawFormData);
    const userData = {
        payload: {
            username: rawFormData.username,
            email: rawFormData.email,
            password: rawFormData.password,
            passwordConfirm: rawFormData.passwordConfirm
        },
        provider: "email"
    };
    try {
        const response = await fetch('http://localhost:3001/sign-up',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    userData
                )
            });
        // Check if the response was successful
        if (response.ok) {
            // If the request was successful, return success status and message
            return { status: StatusCodes.OK, message: "Registration is successful", type: 'success' };
        } else {
            // If the response is not OK, get the error message from the response
            const errorResponse = await response.json();
            return { status: response.status, message: errorResponse.message || 'Error during registration', type: 'error' };
        }

    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    catch (err: any) {
        // Return error status and message in case of failure
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: err.message || 'Something went wrong', type: 'error' };
    }
}