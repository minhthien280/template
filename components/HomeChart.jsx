'use client'
import { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import { Button } from '@nextui-org/react'
import DrawChart from './D3Components/d3Home'

export default function HomeChart() {
  const svgRef = useRef()
  const selectRef = useRef()
  useEffect(() => {
    fetch('/api/data/home')
      .then((res) => res.json())
      .then((data) => DrawChart(data, svgRef, selectRef))
  }, [])

  return (
    <>
      <select ref={selectRef} id="selectButton"></select>
      <svg ref={svgRef} id="chart"></svg>
    </>
  )
}
// width="960" height="600" viewBox="[0,0,960,600]"
