// app/api/report/summary/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    totalCampaigns: 32,
    impressions: '1.2M',
    clicks: '85.2K',
    revenue: '₹3.8L',
  })
}