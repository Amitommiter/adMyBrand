// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Amit Raj', email: 'amit@example.com', role: 'Admin', plan: 'Premium' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', plan: 'Basic' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', plan: 'Pro' }
  ])
}