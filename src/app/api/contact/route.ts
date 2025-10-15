import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In a real app you'd validate and persist or forward this data (email, db, slack, etc.)
    console.log('Contact form submitted:', data)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
