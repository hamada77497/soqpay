import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentId } = body;

    console.log('Completing payment:', paymentId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error completing payment:', error);
    return NextResponse.json(
      { error: 'Failed to complete payment' },
      { status: 500 }
    );
  }
}