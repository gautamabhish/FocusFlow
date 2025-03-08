//@ts-nocheck
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

// Define protected routes
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  if (protectedRoutes.includes(path)) {
    const authToken = cookies().get("authToken"); // Read Firebase Auth token

    if (!authToken) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to login
    }
  }

  return NextResponse.next(); // Continue if authenticated
}
