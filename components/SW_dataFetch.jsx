'use client'

import { useEffect, useState, useRef } from 'react'
import SWLineDraw from './LineChart_ShirleyWu'

export function SWLine() {
  const [rawData, setData] = useState(null)

  useEffect(() => {
    //https://173.79.230.54:300/data
    //https://minhthien-vipcg-edb4d416-1240-4f02-841e-828974874d14.socketxp.com/data

    fetch('https://minhthien-vipcg-500edfc3-ecb4-4b56-ac26-fd83aeca711f.socketxp.com')
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
