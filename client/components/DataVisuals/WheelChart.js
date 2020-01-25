import React from 'react'
import {ResponsivePie} from '@nivo/pie'

function getWheelData(entries, ratingType) {
  let data = []

  if (ratingType === 'Binary') {
    data = [
      {
        id: 'false',
        label: 'false',
        value: 0
      },
      {
        id: 'true',
        label: 'true',
        value: 0
      }
    ]

    entries.forEach(entry => {
      if (entry.value === 0) {
        data[0].value++
      }
      if (entry.value === 1) {
        data[1].value++
      }
    })
  }

  if (ratingType === 'FiveStars') {
    for (let i = 0; i < 5; i++) {
      data[i] = {
        id: `${i}`,
        label: `${i}`,
        value: 0
      }
    }

    entries.forEach(entry => {
      data[entry.value - 1].value++
    })
  }

  if (ratingType === 'Counter') {
    //find max count of any entry

    let maxCount = 0

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].value > maxCount) {
        maxCount = entries[i].value
      }
    }

    for (let i = 0; i <= maxCount; i++) {
      data[i] = {
        id: `${i}`,
        label: `${i}`,
        value: 0
      }
    }

    entries.forEach(entry => {
      data[entry.value].value++
    })

    data = data.filter(item => item.value !== 0)
  }

  return data
}

const WheelChart = props => {
  const {entries, ratingType} = props
  const data = getWheelData(entries, ratingType)
  return (
    <div className="wheelChartCont">
      <h2>Number of Entries: {entries.length}</h2>
      <ResponsivePie
        data={data}
        margin={{top: 40, right: 40, bottom: 40, left: 40}}
        startAngle={-180}
        sortByValue={true}
        innerRadius={0.55}
        cornerRadius={8}
        colors={{scheme: 'set2'}}
        padAngle={4}
        borderColor={{from: 'color', modifiers: [['darker', '0.1']]}}
        enableRadialLabels={false}
        enableSlicesLabels={true}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{from: 'color'}}
        sliceLabel={function(e) {
          return e.id + ' (' + e.value + ')'
        }}
        slicesLabelsSkipAngle={0}
        slicesLabelsTextColor="#ffffff"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  )
}

export default WheelChart
