// import { NextRequest, NextResponse } from "next/server";
// import { tokenVerify } from "./lib/security/tokenVerify";

// export async function middleware(req: NextRequest) {
//     const url = req.nextUrl.clone();

//     // Skip static files, _next, and API routes
//     if (
//         req.nextUrl.pathname.startsWith("/_next/") ||
//         req.nextUrl.pathname.startsWith("/api/") ||
//         /\.(.*)$/.test(req.nextUrl.pathname)
//     ) {
//         return NextResponse.next();
//     }

//     const email = await tokenVerify("refreshToken", req);
//     console.log('emailllll ',email)

//     // Routes to block for authenticated users
//     if (email) {
//         if (
//             url.pathname === "/pages/user-login" ||
//             url.pathname === "/pages/signup"
//         ) {
//             url.pathname = "/pages/home";
//             return NextResponse.redirect(url);
//         }
//     }

//     // Routes to block for unauthenticated users
//     if (!email) {
//         if (
//             url.pathname === "/pages/my-notes" ||
//             url.pathname === "/pages/notes"
//         ) {
//             url.pathname = "/pages/user-login";
//             return NextResponse.redirect(url);
//         }
//     }

//     // `/pages/home` should always be accessible
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/pages/:path*"],
// };
