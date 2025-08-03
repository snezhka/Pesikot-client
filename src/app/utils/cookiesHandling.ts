'use server'

import { cookies } from "next/headers";
import ISignInResponse from "../interfaces";

export async function setCookies(tokens: ISignInResponse) {
    console.log("Tokens", tokens);
    const _cookies = cookies();
    _cookies.set("accessToken", tokens?.accessToken, {
        name: "accessToken",
        value: tokens?.accessToken,
        httpOnly: true,
        path: "/"
    });
    if (tokens?.refreshToken) {
        _cookies.set("refreshToken", tokens?.refreshToken, {
            name: "refreshToken",
            value: tokens?.refreshToken,
            httpOnly: true,
            path: "/"
        });
    }
}

export async function removeTokenCookies() {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
}