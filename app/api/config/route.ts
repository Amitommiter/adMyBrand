// app/api/config/route.ts
import { NextResponse } from 'next/server'
import { defaultConfig } from '@/lib/config'

export async function GET() {
  // In a real application, this would fetch from your database
  // For now, we'll return the default config
  return NextResponse.json(defaultConfig)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // In a real application, you would save this to your database
    // For now, we'll just return the updated config
    
    return NextResponse.json({
      success: true,
      message: 'Configuration updated successfully',
      data: body
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update configuration' },
      { status: 500 }
    )
  }
} 