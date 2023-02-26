// middleware.js
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return new NextResponse(
    JSON.stringify({ success: false, message: 'authentication failed' }),
    { status: 401, headers: { 'content-type': 'application/json' } }
  )
  // console.log('middleware called')
  // return NextResponse.redirect(new URL('/test/path', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/(.*)',
}
