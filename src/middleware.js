import { NextResponse } from 'next/server';

export function middleware(req) {
  const accessToken = req.cookies.get('firebase_token');

  const url = req.nextUrl.clone();
  if (!accessToken) {
    if (url.pathname !== '/login') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname === '/login') {
      url.pathname = '/home';
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ['/home', '/login', '/profil/:path*', '/aktifitas', "/bottlein", "/qr", "/receipt-qr"],
};
