import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function  proxy(request: NextRequest) {
  const token = request.cookies.get("jwt_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    const payload =await verifyToken(token);
    if (payload) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
export const config = {
  matcher: ['/']
}
