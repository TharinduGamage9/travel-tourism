import { NextResponse } from 'next/server';

export async function POST() {
  // Since we're using localStorage on client-side,
  // logout is handled client-side, but we can add server-side cleanup here if needed
  return NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );
}

