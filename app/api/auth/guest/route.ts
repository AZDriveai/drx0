import { NextRequest, NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';

export async function GET(request: NextRequest) {
  // Redirect to main page with guest session
  return NextResponse.redirect(new URL('/', request.url));
}

