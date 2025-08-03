'use server'


export async function resetPasswordAction(token: string, rawFormData: FormData) {
    // Log the token to check if it's being extracted correctly
    console.log('Reset Token:', token);
    console.log("Form data", rawFormData);
    const userData = {
        newPassword: rawFormData.newPassword
    };
    console.log("User data", userData);
    try {
        const response = await fetch('http://localhost:3001/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'reset-token': token,
            },
            body: JSON.stringify(userData),
        });
        console.log("RESPONSE", response);
        if (!response.ok) {
            const body = await response.json();
            console.log("BODY", body);
            throw new Error(`Error: ${body.message}`); // will not throw, return error message with type "error"
        }
        //Add for response.ok
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error('Error during reset password action:', err.message);
        throw new Error(err.message);
    }
}