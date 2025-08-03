'use server'

import { redirect } from "next/navigation";
import { removeTokenCookies } from "../utils/cookiesHandling";


export async function signOut() {
    await removeTokenCookies();
    redirect('/sign-in');
}

