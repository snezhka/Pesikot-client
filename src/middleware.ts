import { NextRequest, NextResponse } from 'next/server';
import { validateMiddlewareToken } from './app/utils/tokensHandling';
// Optionally, add a JWT verification function here
// import jwt from 'jsonwebtoken';

// 1. Specify protected and public routes
const protectedRoutes = ['/account', '/settings'];
const publicRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    if (path == '/') {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 2. Validate accessToken in the cookies
    const decodedToken = await validateMiddlewareToken();

    // 4. Redirect to /signIn if the user is not authenticated
    if (isProtectedRoute && !decodedToken) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

