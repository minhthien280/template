'use client'

import { useEffect, useState, useRef } from 'react'
import SWLineDraw from './LineChart_ShirleyWu'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function SWLine() {
  const [rawData, setData] = useState(null)

  useEffect(() => {
    //https://cse6242.azurewebsites.net/api/data
    //http://localhost:7071/api/data
    fetch('/api/data', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  const xRef = useRef(null)
  const yRef = useRef(null)
  if (!rawData) return
  console.log(rawData)
  return SWLineDraw(rawData, xRef, yRef)
}
