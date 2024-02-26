'use client'
import * as d3 from 'd3'

function SWLineDraw(data, xRef, yRef) {
  const width = 640
  const height = 400
  const marginTop = 20
  const marginRight = 20
  const marginBottom = 30
  const marginLeft = 60
  const innerHeight = height - marginBottom - marginTop
  const innerWidth = width - marginLeft - marginRight

  const x = d3.scaleLinear().range([0, innerWidth]).domain(d3.extent(data))
  const y = d3.scaleLinear().range([innerHeight, 0]).domain(d3.extent(data))
  const line = d3.line((d, i) => x(i), y)
  const xAxis = d3.axisBottom().scale(x)
  const yAxis = d3.axisLeft().scale(y)

  // console.log(xRef)

  d3.select(xRef.current).call(xAxis)
  d3.select(yRef.current).call(yAxis)

  // function showChart(){
  //   console.log(xRef)
  //   d3.select(xRef.current).call(xAxis)
  //   d3.select(yRef.current).call(yAxis)
  // }

  // Building axis
  // Because of the nature of REACT, the axis must be build seperately, and customize with the help of d3 calculations
  // https://www.react-graph-gallery.com/build-axis-with-react
  return (
    <>
      {/* <button onClick={showChart}>show Chart</button> */}
      <svg width={width} height={height}>
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          <g ref={xRef} transform={`translate(0,${innerHeight})`} />
          <g ref={yRef} />
          <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
        </g>
      </svg>
    </>
  )
}

export default SWLineDraw
