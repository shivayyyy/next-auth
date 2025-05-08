import { NextResponse } from 'next/server'
import  { NextRequest } from 'next/server'
 

export function middleware(req) {
  const path=req.nextUrl.pathname;
  const isPublicPath=path=='/login' || path=='/signup';
  const token=req.cookies.get('token')?.value || '';
  console.log(token)

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/profile',req.nextUrl))
  }
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',req.nextUrl))
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
  ],
}