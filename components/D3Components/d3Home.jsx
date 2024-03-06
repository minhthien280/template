import * as d3 from 'd3'
export default function DrawChart(data, svgRef, selectRef) {
  //console.log(svgRef)
  //console.log(selectRef)
  //if (!svgRef || !selectRef) return
  // Chart Dimensions
  const width = 928
  const height = 600
  const margin = { Top: 20, Right: 100, Bottom: 100, Left: 100 }

  // Loading dataset
  // Data will be stored in dataset in long format for filtering
  const fertility_indicator = 'SP.DYN.TFRT.IN'
  const indicators = [
    'BM.GSR.CMCP.ZS',
    'SE.PRM.ENRL.TC.ZS',
    'SE.SEC.CUAT.LO.ZS',
    'SH.H2O.BASW.ZS',
    'SH.STA.BASS.ZS',
    'BG.GSR.NFSV.GD.ZS',
  ]
  const default_indicator = 'BM.GSR.CMCP.ZS'
  //console.log(data)
  const dataset = []
  data.forEach(function (d) {
    for (var colName in d) {
      if (colName != 'year') {
        dataset.push({ year: +d['year'], indicator: colName, value: d[colName] })
      }
    }
  })
  //console.log(dataset)
  // Horizontal scale
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => +d.year))
    .range([margin.Left, width - margin.Right])
    .clamp(true)

  // Grouping data according to indicator
  const series = d3
    .groups(dataset, (d) => d.indicator)
    .map(([key, values]) => {
      return { key, values: values.map(({ year, value }) => ({ year, value: +value })) }
    })

  // Vertical scale
  const yScale = d3.scaleLinear().range([height - margin.Bottom, margin.Top])

  const yyScale = d3.scaleLinear().range([height - margin.Bottom, margin.Top])

  // Color scale
  const zScale = d3.scaleOrdinal(d3.schemeCategory10).domain(series.map((d) => d.indicator))

  // Create SVG
  const svg = d3.select(svgRef.current)

  svg
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .style('max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;')

  // Create axes
  // X-axis
  var x_axis = d3.axisBottom().scale(xScale).ticks(10).tickFormat(d3.format(''))
  console.log(svg)
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
    .text('Year')

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
    .attr('y', margin.Left / 2)
    .attr('dy', '.95em')
    .attr('x', -height / 2 + margin.Top)
    .attr('transform', 'rotate(-90)')
    .text('Indicator')

  // YY-axis

  var yy_axis = d3.axisRight().scale(yyScale).ticks(10).tickFormat(d3.format('.2f'))

  svg
    .append('g')
    .attr('id', 'yyAxis')
    .attr('transform', 'translate(' + (width - margin.Right) + ',0)')

  svg
    .append('text')
    .attr('class', 'yy label')
    .attr('text-anchor', 'middle')
    .attr('y', width - margin.Right / 2)
    .attr('dy', '.95em')
    .attr('x', -height / 2 + margin.Top)
    .attr('transform', 'rotate(-90)')
    .text('Fertility Rate')

  // Options for the button
  d3.select(selectRef.current)
    .selectAll('myOptions')
    .data(indicators)
    .enter()
    .append('option')
    .text(function (d) {
      return d
    })
    .attr('value', function (d) {
      return d
    })

  // Create line for default series with label
  const line = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value))

  // Ploting Default Indicator
  var default_data = d3.filter(series, (d) => d.key == default_indicator)
  yScale.domain(
    d3.extent(default_data[0].values, function (d) {
      return d.value
    })
  )
  svg.select('#yAxis').call(y_axis)

  const plot = svg
    .append('g')
    .attr('id', 'Plot')
    .append('path')
    .datum(default_data)
    .attr('d', (d) => line(d[0].values))
    .attr('stroke', (d) => zScale(default_indicator))
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  // Plotting Fertility Rate on second y-axis
  // Line function for second axis
  const line2 = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yyScale(d.value))

  // Filtering data
  var fertility_data = d3.filter(series, (d) => d.key == fertility_indicator)
  yyScale.domain(
    d3.extent(fertility_data[0].values, function (d) {
      return d.value
    })
  )
  svg.select('#yyAxis').call(yy_axis)

  // Plotting data on second axis
  const plot2 = svg
    .append('g')
    .attr('id', 'Plot-2')
    .append('path')
    .datum(fertility_data)
    .attr('d', (d) => line2(d[0].values))
    .attr('stroke', (d) => zScale(fertility_indicator))
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  // Handmade legend
  svg
    .append('circle')
    .attr('id', 'circle1')
    .attr('cx', width * 0.6)
    .attr('cy', margin.Top)
    .attr('r', 6)
    .style('fill', zScale(default_indicator))
  svg
    .append('circle')
    .attr('cx', width * 0.6)
    .attr('cy', margin.Top + 30)
    .attr('r', 6)
    .style('fill', zScale(fertility_indicator))
  svg
    .append('text')
    .attr('id', 'label1')
    .attr('x', width * 0.6 + 8)
    .attr('y', margin.Top)
    .text(default_indicator)
    .style('font-size', '15px')
    .attr('alignment-baseline', 'middle')
  svg
    .append('text')
    .attr('x', width * 0.6 + 8)
    .attr('y', margin.Top + 30)
    .text(fertility_indicator)
    .style('font-size', '15px')
    .attr('alignment-baseline', 'middle')

  // Define a function for updating the chart

  function update(selectedIndicator) {
    const datafilter = d3.filter(series, (d) => d.key == selectedIndicator)

    // Update Axis
    yScale.domain(
      d3.extent(datafilter[0].values, function (d) {
        return d.value
      })
    )
    svg.select('#yAxis').call(y_axis)

    // Update label
    svg.select('#label1').text(selectedIndicator)
    svg.select('#circle1').style('fill', zScale(selectedIndicator))

    // Update chart
    plot
      .datum(datafilter)
      .transition()
      .duration(1000)
      .attr('d', (d) => line(d[0].values))
      .attr('stroke', (d) => zScale(selectedIndicator))
  }

  // When the button is changed we run the udpate function
  d3.select(selectRef.current).on('change', function (event, d) {
    // obtain chosen option
    const selectedOption = d3.select(this).property('value')
    console.log(selectRef)
    // update chart
    update(selectedOption)
  })
}
