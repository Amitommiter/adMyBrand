// app/api/settings/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { firstName, lastName, email } = data

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("Received settings:", { firstName, lastName, email })

    // Here you would save to a DB or service

    return NextResponse.json(
      { message: "Settings saved successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}