'use client'

import { useEffect, useState, useRef } from 'react'
import SWLineDraw from './LineChart_ShirleyWu'

export function SWLine() {
  const [rawData, setData] = useState(null)

  useEffect(() => {
    fetch('https://minhthien-vipcg-edb4d416-1240-4f02-841e-828974874d14.socketxp.com/data')
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
