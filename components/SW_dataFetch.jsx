'use client'

import { useEffect, useState, useRef } from 'react'
import SWLineDraw from './LineChart_ShirleyWu'

export function SWLine() {
  const [rawData, setData] = useState(null)

  useEffect(() => {
    //https://cse6242.azurewebsites.net/api/data
    //http://localhost:7071/api/data
    fetch('https://cse6242.azurewebsites.net/api/data', {
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

  return SWLineDraw(rawData.data, xRef, yRef)
}
