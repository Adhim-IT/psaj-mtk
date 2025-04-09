// import { auth } from "@/auth"
// import { NextResponse } from "next/server"
// import { isAdmin } from "./lib/login"

// export default auth(async (req) => {
//   const session = req.auth
//   const pathname = req.nextUrl.pathname

//   // Check if user is trying to access admin routes
//   if (pathname.startsWith("/admin")) {
//     // If not authenticated, redirect to login
//     if (!session) {
//       const loginUrl = new URL("/login", req.nextUrl.origin)
//       loginUrl.searchParams.set("callbackUrl", pathname)
//       return Response.redirect(loginUrl)
//     }

//     // Check if user has admin email
//     if (!isAdmin(session.user?.email)) {
//       // Redirect unauthorized users to unauthorized page
//       return Response.redirect(new URL("/admin/unauthorized", req.nextUrl.origin))
//     }
//   }

//   // Check if user is trying to access protected user routes
//   if (pathname.startsWith("/materi") || pathname.startsWith("/quiz") || pathname.startsWith("/profile")) {
//     // If not authenticated, redirect to login
//     if (!session) {
//       const loginUrl = new URL("/login", req.nextUrl.origin)
//       loginUrl.searchParams.set("callbackUrl", pathname)
//       return Response.redirect(loginUrl)
//     }
//   }

//   // Redirect from login page if user is already authenticated
//   if (session && pathname === "/login") {
//     // Redirect admin to admin dashboard
//     if (isAdmin(session.user?.email)) {
//       return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl.origin))
//     }
//     // Redirect regular users to home
//     return NextResponse.redirect(new URL("/", req.nextUrl.origin))
//   }
// })

// export const config = {
//   matcher: ["/admin/:path*", "/login", "/materi/:path*", "/quiz/:path*", "/profile/:path*"],
// }

