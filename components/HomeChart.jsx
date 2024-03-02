'use client'
import { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import { Listbox } from '@headlessui/react'

export default function HomeChart() {
  const [rawData, setData] = useState(Array)
  const [regionId, setRegionId] = useState(8)
  const [data, setSelectedData] = useState(Array)
  const xRef = useRef()
  const yRef = useRef()
  useEffect(() => {
    //https://cse6242.azurewebsites.net/api/data
    //http://localhost:7071/api/data
    fetch('/api/data/home', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setSelectedData(data)
      })
  }, [])
  const indicators = ['BG.GSR.NFSV.GD.ZS', 'SP.DYN.TFRT.IN']
  // ,
  //   'BM.GSR.CMCP.ZS',
  //   'SE.PRM.ENRL.TC.ZS',
  //   'SE.SEC.CUAT.LO.ZS',
  //   'SH.H2O.BASW.ZS',
  //   'SH.STA.BASS.ZS',
  //   ]
  //
  //"BG.GSR.NFSV.GD.ZS": "0.25"                 Trade in services (%GDP)
  //"BM.GSR.CMCP.ZS": "-0.9999291198562383"     Communications, computer, etc. (% of service imports, BoP)
  //"SE.PRM.ENRL.TC.ZS": "0.7826086956521738"   Education, pupil-teacher ratio
  //"SE.SEC.CUAT.LO.ZS": "1.0"                  Education attainment, at least complete lower secondary
  //"SH.H2O.BASW.ZS": "0.42105263157894735"     Basic drinking water services
  //"SH.STA.BASS.ZS": "0.11111111111111116"     Basic sanitation services
  //"SP.DYN.TFRT.IN": "-0.46153846153846156"    Fertility Rate
  //
  if (!rawData || rawData.length == 0) return <></>
  const width = 1000
  const height = 400
  const margin = { top: 20, right: 20, left: 60, bottom: 30 }

  const xScale = d3.scaleLinear().domain([1960, 2022]).range([0, width])
  const yScale = d3.scaleLinear().range([height, 0])
  const lineFunc = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value))
  const color = d3.scaleOrdinal().domain(indicators).range(['red', 'blue'])

  //console.log(rawData)
  const regions = Array.from(new Set(rawData.map((d) => d.region)))

  //console.log(regions)
  const regions_choices = regions.map((d, i) => {
    return {
      id: i,
      name: d,
    }
  })
  regions_choices.push({ id: 0, name: 'Select a region to focus' })
  const onDropdownChanged = function (d) {
    setRegionId(d)
    if (d == 8)
      //All regions if non is selected
      setSelectedData([])
    else {
      setSelectedData(rawData.filter((raw) => raw.region == regions_choices[d].name))
      d3.select(xRef.current).call(d3.axisBottom().scale(xScale))
      d3.select(yRef.current).call(d3.axisLeft().scale(yScale))
    }
  }

  return (
    <>
      <Listbox value={regions_choices[regionId]} onChange={onDropdownChanged}>
        <Listbox.Button>{regions_choices[regionId].name}</Listbox.Button>
        <Listbox.Options>
          {regions_choices.map((region) => (
            <Listbox.Option key={region.id} value={region.id}>
              {region.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <svg
        id="home-chart"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g ref={xRef} transform={`translate(0,${height + margin.top})`} />
        <g ref={yRef} />
        {indicators.map((indicator) => {
          let tmp = data.map((d) => ({ year: d.year, value: d[indicator] }))
          console.log(indicator)
          console.log(tmp)
          yScale.domain([-1, 1]) //d3.extent(tmp, d => d.value))
          return <path key={indicator} fill="none" stroke={color(indicator)} d={lineFunc(tmp)} />
        })}
      </svg>
    </>
  )
}
