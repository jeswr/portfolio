import { NextResponse } from "next/server";

export async function middleware (
  request: Request,
  context: any
): Promise<Response> {
  return new NextResponse(null)
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/(.*)',
}
