'use server'

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { jwtConstants } from "./constants";
import { removeTokenCookies, setCookies } from "./cookiesHandling";
import { signOut } from "../settings/signOut.action";

export default async function sendRequest(url: string, fetchObject: unknown) {
    let accessToken;
    try {
        accessToken = await validateAccessToken();
        return await _fetchWithToken(url, fetchObject, accessToken);
    } catch {
        console.log('Sending request to get Access Token');
        accessToken = await getAccessTokenFromServer()
        return await _fetchWithToken(url, fetchObject, accessToken);
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function _fetchWithToken(url: string, fetchObject: any, accessToken: string) {
    Object.assign(fetchObject["headers"], { 'Authorization': `Bearer ${accessToken}` })
    console.log(url);
    console.log(fetchObject);
    try {
        const response = await fetch(url, fetchObject);
        if (response.status != 200) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Response data:', data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function validateAccessToken() {
    console.log('Getting access token from cookies');
    const accessToken = cookies().get("accessToken")?.value || '';
    //add if - if accessToken exist ..
    console.log('Access token from cookie', accessToken);
    try {
        const verified = await jwtVerify(
            accessToken,
            new TextEncoder().encode(jwtConstants.JWT_ACCESS_SECRET)
        );
        console.log('Verified', verified.payload);
        return accessToken;

    } catch (error: unknown) {
        console.log('Access token is invalid');
        throw new Error('Access token is invalid');
    }
}

export async function getAccessTokenFromServer() {
    console.log('Getting refresh token from cookies');
    const refreshToken = cookies().get("refreshToken")?.value || '';
    try {
        const response = await fetch('http://localhost:3001/refresh',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'refresh-token': refreshToken
                }
            });
        if (response.status == 401) {
            console.log('You will be signed out ...');
            await signOut();
            return response;
        }
        //cookies max-age change instead of session
        const res = await response.json();
        const accessToken = await res.accessToken;
        console.log('Access token from server', accessToken);
        setCookies({ accessToken });
        return accessToken;

    } catch (err) {
        console.log(err);
    }
}

export async function validateMiddlewareToken() {
    const _cookies = cookies();
    const accessToken = _cookies.get('accessToken')?.value;

    // 3. Optional: Validate the accessToken if it's a JWT
    if (!!accessToken) {
        return async (token: string) => {
            try {
                const decodedToken = jwtVerify(token,
                    new TextEncoder().encode(jwtConstants.JWT_ACCESS_SECRET)); // Use your JWT secret
                return decodedToken;
            } catch (err) {
                try {
                    return getAccessTokenFromServer();
                } catch {
                    removeTokenCookies()
                    return null;
                }
            }
        };
    } else {
        removeTokenCookies();
    }
}