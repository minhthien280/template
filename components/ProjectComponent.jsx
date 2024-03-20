'use client'
import { Button, Select, SelectItem, Slider, Tooltip } from '@nextui-org/react'
import { useState, useRef, useEffect } from 'react'
import useMouse from '@react-hook/mouse-position'
import DrawChart, { UpdateChart } from './D3Components/d3Project'

export default function ProjectComponent() {
  const svgRef = useRef()
  const tooltipRef = useRef()
  const [water, setWater] = useState(0)
  const [sanitation, setSanitation] = useState(0)
  const [trade, setTrade] = useState(0)
  const [computer, setComputer] = useState(0)
  const [student, setStudent] = useState(0)
  const [secondary, setSecondary] = useState(0)
  //const [prediction, setPrediction] = useState(0)

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
    var req = {
      region: 'Europe',
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
    DrawChart(svgRef, tooltipRef)
  }, [])
  return (
    <div className="items-start space-y-2 xl:grid xl:grid-cols-2 xl:gap-x-8 xl:space-y-0">
      <div className="col-6">
        <div id="waterSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Tooltip content="Change in water availability next year">
            <Slider
              label="Water availability"
              step={0.01}
              maxValue={4}
              minValue={-4}
              defaultValue={0}
              className="max-w-md"
              value={water}
              getValue={(d) => `${d}%`}
              onChange={onWaterChanged}
            />
          </Tooltip>
        </div>
        <div id="sanitationSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Tooltip content="Change in Sanitation Services next year">
            <Slider
              label="Sanitation Services"
              step={0.01}
              maxValue={4}
              minValue={-4}
              defaultValue={0}
              className="max-w-md"
              value={sanitation}
              getValue={(d) => `${d}%`}
              onChange={onSanitationChanged}
            />
          </Tooltip>
        </div>
        <div id="tradeSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Tooltip content="Change in Trade amount next year">
            <Slider
              label="Trade in services"
              step={0.01}
              maxValue={4}
              minValue={-4}
              defaultValue={0}
              className="max-w-md"
              value={trade}
              getValue={(d) => `${d}%`}
              onChange={onTradeChanged}
            />
          </Tooltip>
        </div>
        <div id="computerSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Tooltip content="Change in use of Computer/Communication Services next year">
            <Slider
              label="Use of Computer/Communication"
              step={0.01}
              maxValue={4}
              minValue={-4}
              defaultValue={0}
              className="max-w-md"
              value={computer}
              getValue={(d) => `${d}%`}
              onChange={onComputerChanged}
            />
          </Tooltip>
        </div>
        <div id="p2tSlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Tooltip content="Change in Student-Teacher ratio next year">
            <Slider
              label="Student to teacher ratio"
              step={0.01}
              maxValue={4}
              minValue={-4}
              defaultValue={0}
              className="max-w-md"
              value={student}
              getValue={(d) => `${d}%`}
              onChange={onStudentChanged}
            />
          </Tooltip>
        </div>
        <div id="secondarySlider" className="flex w-full flex-wrap gap-4 pt-6 md:flex-nowrap">
          <Tooltip content="Change in amount of people complete secondary next year">
            <Slider
              label="%Complete Secondary"
              step={0.01}
              maxValue={4}
              minValue={-4}
              defaultValue={0}
              className="max-w-md"
              value={secondary}
              getValue={(d) => `${d}%`}
              onChange={onSecondaryChanged}
            />
          </Tooltip>
        </div>
        <Button onClick={onButtonClicked}>Submit/Update</Button>
      </div>
      <div className="col-6" ref={tooltipRef}>
        <svg ref={svgRef} />
      </div>
    </div>
  )
}
