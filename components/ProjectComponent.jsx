'use client'
import { Button, Select, SelectItem, Slider } from '@nextui-org/react'
import { useState, useRef, useEffect } from 'react'
import DrawChart, { UpdateChart } from './D3Components/d3Project'

export default function ProjectComponent() {
  const regions = [
    {
      value: 'Asia & Pacific',
      label: 'Asia & Pacific',
    },
    {
      value: 'Europe',
      label: 'Europe',
    },
    {
      value: 'Africa',
      label: 'Africa',
    },
    {
      value: 'Arab States',
      label: 'Arab States',
    },
    {
      value: 'South/Latin America',
      label: 'South/Latin America',
    },
    {
      value: 'North America',
      label: 'North America',
    },
  ]
  const svgRef = useRef()
  const [region, setRegion] = useState()
  const [water, setWater] = useState(0)
  const [sanitation, setSanitation] = useState(0)
  const [trade, setTrade] = useState(0)
  const [computer, setComputer] = useState(0)
  const [student, setStudent] = useState(0)
  const [secondary, setSecondary] = useState(0)
  //const [prediction, setPrediction] = useState(0)

  function onRegionChanged(r) {
    //console.log(r)
    var iter = r.values()
    var next_item = iter.next()
    console.log(next_item.value)
    setRegion(r)
  }
  function onWaterChanged(value) {
    setWater(value)
  }
  function onSanitationChanged(value) {
    setSanitation(value)
  }
  function onTradeChanged(value) {
    setTrade(value)
  }
  function onComputerChanged(value) {
    setComputer(value)
  }
  function onStudentChanged(value) {
    setStudent(value)
  }
  function onSecondaryChanged(value) {
    setSecondary(value)
  }
  function onButtonClicked(event) {
    var next_item = region.values().next()
    var req = {
      region: next_item.value,
      water: water,
      gdp: trade,
      sanitation: sanitation,
      computer: computer,
      student: student,
      secondary: secondary,
    }
    console.log(req)
    fetch('api/data/project', {
      method: 'POST',
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        //setPrediction(data.res)
        UpdateChart(data, svgRef)
      })
  }

  useEffect(() => {
    DrawChart(svgRef)
  }, [])
  return (
    <div className="items-start space-y-2 xl:grid xl:grid-cols-2 xl:gap-x-8 xl:space-y-0">
      <div className="col-6">
        <div id="regionSelection" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Select
            label="Select a region"
            className="max-w-xs"
            selectedKeys={region}
            onSelectionChange={onRegionChanged}
          >
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div id="waterSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Slider
            label="Water availability"
            step={0.01}
            maxValue={4}
            minValue={-4}
            defaultValue={0}
            className="max-w-md"
            value={water}
            onChange={onWaterChanged}
          />
        </div>
        <div id="sanitationSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Slider
            label="Sanitation Services"
            step={0.01}
            maxValue={4}
            minValue={-4}
            defaultValue={0}
            className="max-w-md"
            value={sanitation}
            onChange={onSanitationChanged}
          />
        </div>
        <div id="tradeSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Slider
            label="Trade in services"
            step={0.01}
            maxValue={4}
            minValue={-4}
            defaultValue={0}
            className="max-w-md"
            value={trade}
            onChange={onTradeChanged}
          />
        </div>
        <div id="computerSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Slider
            label="Use of Computer/Communication"
            step={0.01}
            maxValue={4}
            minValue={-4}
            defaultValue={0}
            className="max-w-md"
            value={computer}
            onChange={onComputerChanged}
          />
        </div>
        <div id="p2tSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Slider
            label="Student to teacher ratio"
            step={0.01}
            maxValue={4}
            minValue={-4}
            defaultValue={0}
            className="max-w-md"
            value={student}
            onChange={onStudentChanged}
          />
        </div>
        <div id="secondarySlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Slider
            label="%Complete Secondary"
            step={0.01}
            maxValue={4}
            minValue={-4}
            defaultValue={0}
            className="max-w-md"
            value={secondary}
            onChange={onSecondaryChanged}
          />
        </div>
        <Button onClick={onButtonClicked}>Submit/Update</Button>
      </div>
      <div className="col-6">
        <svg ref={svgRef} />
      </div>
    </div>
  )
}
