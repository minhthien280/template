import * as d3 from 'd3'

const width = 700
const height = 600
const margin = { Top: 20, Right: 20, Bottom: 60, Left: 60 }

export default function DrawChart(svgRef) {
  // Loading dataset
  // Data should be the true Fertility Rate not the changes
  const data = {
    'Asia & Pacific': -0.9412517191629717,
    Africa: -0.887478699269109,
    'Arab States': -0.9334618653054161,
    Europe: -0.9597953686054055,
    'Middle east': -0.9843197531390941,
    'North America': -0.9872357723577236,
    'Central America': -0.978494623655914,
    'Latin America': -0.9150413630606444,
  }
  const listOfRegions = Object.keys(data)

  // Horizontal scale
  const xScale = d3
    .scaleBand()
    .domain(listOfRegions)
    .range([margin.Left, width - margin.Right])

  // Vertical scale
  const yScale = d3
    .scaleLinear()
    .range([height - margin.Bottom, margin.Top])
    .domain([-2, 2])

  // Color scale
  const zScale = d3.scaleOrdinal(d3.schemeCategory10).domain(listOfRegions)

  // Create SVG
  const svg = d3.select(svgRef.current)

  svg
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .style('max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;')

  // Create axes
  // X-axis
  var x_axis = d3.axisBottom().scale(xScale)
  svg
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', 'translate(0,' + (height - margin.Bottom) + ')')
    .call(x_axis)

  svg
    .append('text')
    .attr('class', 'x label')
    .attr('text-anchor', 'end')
    .attr('x', width / 2)
    .attr('y', height - margin.Bottom / 2)
    .text('Region')

  // Y-axis
  var y_axis = d3.axisLeft().scale(yScale).ticks(10).tickFormat(d3.format('.2f'))

  svg
    .append('g')
    .attr('id', 'yAxis')
    .attr('transform', 'translate(' + margin.Left + ',0)')

  svg
    .append('text')
    .attr('class', 'yy label')
    .attr('text-anchor', 'middle')
    .attr('y', margin.Top / 2)
    .attr('dy', '.95em')
    .attr('x', -height / 2)
    .attr('transform', 'rotate(-90)')
    .text('Fertility Rate')

  // Create rectangles
  svg
    .append('g')
    .attr('id', 'static-chart')
    .selectAll('rect')
    .data(listOfRegions)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d))
    .attr('y', (d) => Math.min(yScale(data[d]), yScale(0)))
    .attr('width', xScale.bandwidth() - 10)
    .attr('height', (d) => Math.abs(yScale(0) - yScale(data[d])))
    .attr('fill', (d) => zScale(d))

  svg.select('#yAxis').call(y_axis)
}

export function UpdateChart(data, svgRef) {
  const yScale = d3
    .scaleLinear()
    .range([height - margin.Bottom, margin.Top])
    .domain([-2, 2])
  d3.select(svgRef.current).select('#predict').remove()
  const line = d3.select(svgRef.current).append('line').attr('id', 'predict')
  console.log(data.res)
  line
    .style('display', 'block')
    .attr('x1', margin.Left)
    .attr('y1', yScale(data.res))
    .attr('x2', width - margin.Right)
    .attr('y2', yScale(data.res))
    .attr('stroke', 'purple')
}
