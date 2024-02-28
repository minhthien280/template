import { NextResponse } from 'next/server'

export async function GET() {
  const rawData = await fetch('https://cse6242.azurewebsites.net/api/data').then((res) =>
    res.json()
  )
  return NextResponse.json(rawData.data, { status: 200 })
}
