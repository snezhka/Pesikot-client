'use server'

import { cookies } from "next/headers";

export async function signInAction(rawFormData: object) {
    const data = await fetch('http://localhost:3001/sign-in',
        {
            method: 'POST',
            body: JSON.stringify(
                rawFormData
            )
        });
    const tokens = await data.json();
    console.log('tokens', tokens);
    cookies().set("accessToken", tokens.accessToken, {
        name: "accessToken",
        value: tokens.accessToken,
        httpOnly: true,
        path: "/"
    });
    cookies().set("refreshToken", tokens.refreshToken, {
        name: "refreshToken",
        value: tokens.refreshToken,
        httpOnly: true,
        path: "/"
    });
    console.log('access', cookies().get('accessToken'));
    console.log('refresh', cookies().get('refreshToken'));
    return tokens;
}

