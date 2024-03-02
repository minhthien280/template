import { NextResponse } from 'next/server'

const parseCSv = async () => {
  const data = []
  const fs = require('fs')
  const { parse } = require('csv-parse')
  const { finished } = require('stream/promises')
  const parser = fs.createReadStream('./app/api/data/home/homepage-data.csv').pipe(
    parse({
      delimiter: ',',
      columns: true,
      ltrim: true,
    })
  )
  parser
    .on('data', function (row) {
      // This will push the object row into the array
      data.push(row)
    })
    .on('error', function (error) {
      console.log(error.message)
    })
    .on('end', function () {})

  await finished(parser)
  return data
}

export async function GET() {
  //Promise.all(parseCSv())
  const data = await parseCSv()
  //console.log(data)

  return NextResponse.json(data, { status: 200 })
}
