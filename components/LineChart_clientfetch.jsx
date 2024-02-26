'use client'
import { useState, useEffect } from 'react'
import * as d3 from 'd3'
import { AxisBottom } from './D3Components/AxisBottom'
import { AxisLeft } from './D3Components/AxisLeft'

function LinePlot1() {
  const [rawData, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://173.79.230.54:300/data', {
      method: 'GET',
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  if (isLoading) return <p>Loading...</p>
  if (!rawData) return <p>No data yet</p>

  const data = rawData.data
  const width = 640
  const height = 400
  const marginTop = 20
  const marginRight = 20
  const marginBottom = 30
  const marginLeft = 60
  const innerHeight = height - marginBottom - marginTop
  const innerWidth = width - marginLeft - marginRight

  const x = d3.scaleLinear([0, data.length - 1], [0, innerWidth])
  const y = d3.scaleLinear(d3.extent(data), [innerHeight, 0])
  const line = d3.line((d, i) => x(i), y)

  // Building axis
  // Because of the nature of REACT, the axis must be build seperately, and customize with the help of d3 calculations
  // https://www.react-graph-gallery.com/build-axis-with-react
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        <AxisLeft yScale={y} pixelsPerTick={60} />
        <g transform={`translate(0, ${innerHeight})`}>
          <AxisBottom xScale={x} pixelsPerTick={30} />
        </g>
        <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      </g>
    </svg>
  )
}

export default LinePlot1
