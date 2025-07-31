// app/api/report/analytics/route.ts
import { NextResponse } from 'next/server'
import { configService } from '@/lib/config'

export async function GET() {
  try {
    // Load the configuration to get analytics data
    const config = await configService.loadConfig()
    
    // Return the analytics data
    return NextResponse.json({
      success: true,
      data: config.analytics
    })
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch analytics data',
        data: null 
      },
      { status: 500 }
    )
  }
}

// Optional: Add POST endpoint for updating analytics data
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // In a real application, you would save this to your database
    // For now, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: 'Analytics data updated successfully',
      data: body
    })
  } catch (error) {
    console.error('Failed to update analytics data:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update analytics data' 
      },
      { status: 500 }
    )
  }
}