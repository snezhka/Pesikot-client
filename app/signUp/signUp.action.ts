'use server'

import { z } from 'zod';

export async function signUpAction(rawFormData: object) {

    console.log(rawFormData);

    const data = await fetch('http://localhost:3001/sign-up',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                rawFormData
            )
        });
    console.log(data);
    return data.status;

}