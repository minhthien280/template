import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
  if (request.method != 'POST') {
    return NextResponse.json({ message: 'Only POST' }, { status: 405 })
  }
  var req = await request.json()
  //console.log(req)
  const data = await fetch('https://cse6242.azurewebsites.net/api/project', {
    method: 'POST',
    body: JSON.stringify(req),
  })
  const res = await data.json()
  return NextResponse.json({ res }, { status: 200 })
}
