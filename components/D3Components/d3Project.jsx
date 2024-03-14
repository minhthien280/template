import * as d3 from 'd3'

const width = 700
const height = 600
const margin = { Top: 20, Right: 20, Bottom: 60, Left: 60 }

const fertility_data = {
  'Asia & Pacific': 2,
  Africa: 3.564,
  'Arab States': 2.889,
  Europe: 1.043,
  'Middle east': 2,
  'North America': 1,
  'Central America': 2,
  'Latin America': 1.424,
}
let predicted_fertility_data = {
  'Asia & Pacific': 2,
  Africa: 3.564,
  'Arab States': 2.889,
  Europe: 1.043,
  'Middle east': 2,
  'North America': 1,
  'Central America': 2,
  'Latin America': 1.424,
}
const listOfRegions = Object.keys(fertility_data)
// Horizontal scale
const xScale = d3
  .scaleBand()
  .domain(listOfRegions)
  .range([margin.Left, width - margin.Right])
  .padding(0.1)

// Vertical scale
const yScale = d3
  .scaleLinear()
  .range([height - margin.Bottom, margin.Top])
  .domain([0.5, 4.5])

export default function DrawChart(svgRef, tooltipRef) {
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
  svg.select('#yAxis').call(y_axis)

  svg
    .append('text')
    .attr('class', 'yy label')
    .attr('text-anchor', 'middle')
    .attr('y', margin.Top / 2)
    .attr('dy', '.95em')
    .attr('x', -height / 2)
    .attr('transform', 'rotate(-90)')
    .text('Fertility Rate')

  // create a tooltip
  var Tooltip = d3
    .select(tooltipRef.current)
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('position', 'absolute')
  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function (d) {
    Tooltip.style('opacity', 1)
    d3.select(this).style('stroke', 'black').style('opacity', 1)
  }
  var mousemove = function (d, region) {
    console.log(d)
    Tooltip.html(
      `2022 average: ${fertility_data[region]}<br>Predicted value: ${predicted_fertility_data[region]}`
    )
      .style('left', d.layerX + 20 + 'px')
      .style('top', d.layerY + 20 + 'px')
  }
  var mouseleave = function (d) {
    Tooltip.style('opacity', 0)
    d3.select(this).style('stroke', 'none').style('opacity', 0.8)
  }

  // Create rectangles
  svg
    .append('g')
    .attr('id', 'static-chart')
    .selectAll('rect')
    .data(listOfRegions)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d))
    .attr('y', (d) => Math.min(yScale(fertility_data[d]), yScale(0)))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => Math.abs(yScale(0.5) - yScale(fertility_data[d])))
    .attr('fill', (d) => zScale(d))
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)

  // Create dots for predictions
  svg
    .append('g')
    .attr('id', 'prediction')
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(listOfRegions)
    .join('path')
    .attr(
      'transform',
      (d) => `translate(${xScale(d) + xScale.bandwidth() / 2}, ${yScale(fertility_data[d])})`
    )
    .attr('fill', 'black')
    .attr('d', d3.symbol(d3.symbolCircle))

  svg
    .select('#prediction')
    .selectAll('text')
    .data(listOfRegions)
    .join('text')
    .attr(
      'transform',
      (d) => `translate(${xScale(d) + xScale.bandwidth() / 2}, ${yScale(fertility_data[d]) - 20})`
    )
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .text((d) => d3.format('.2f')(fertility_data[d]))

  // Chart title
  svg
    .append('text')
    .attr('x', width / 2 - margin.Left)
    .attr('y', margin.Top)
    .text('Fertility Rate Prediction')

  // Legend
  const legend = svg
    .append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${width - margin.Right * 6}, ${margin.Top * 2})`)
  legend.append('path').attr('d', d3.symbol(d3.symbolCircle))
  legend
    .append('text')
    .attr('x', -60)
    .attr('y', 30)
    .attr('text-anchor', 'center')
    .text('Predicted amount')
}

export function UpdateChart(data, svgRef) {
  const p = d3.select(svgRef.current).select('#prediction')
  // console.log(data.res)
  // console.log(p.selectAll('path'))
  listOfRegions.forEach(
    (d) => (predicted_fertility_data[d] = (1 + data.res / 100) * fertility_data[d])
  )
  p.selectAll('path')
    .data(listOfRegions)
    .attr(
      'transform',
      (d) =>
        `translate(${xScale(d) + xScale.bandwidth() / 2}, ${yScale(predicted_fertility_data[d])})`
    )
  p.selectAll('text')
    .data(listOfRegions)
    .attr(
      'transform',
      (d) =>
        `translate(${xScale(d) + xScale.bandwidth() / 2}, ${yScale(predicted_fertility_data[d])})`
    )
    .text((d) => d3.format('.2f')(predicted_fertility_data[d]))
}
