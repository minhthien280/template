'use client'

import { useEffect, useState, useRef } from 'react'
import SWLineDraw from './LineChart_ShirleyWu'

export function SWLine() {
  const [rawData, setData] = useState(null)

  useEffect(() => {
    fetch('http://173.79.230.54:300/data')
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
