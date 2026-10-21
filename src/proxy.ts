import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, verifyToken } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (await verifyToken(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = { matcher: ["/admin/:path*"] };
