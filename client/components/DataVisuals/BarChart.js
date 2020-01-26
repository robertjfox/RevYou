import {ResponsiveBar} from '@nivo/bar'
import React from 'react'

function getBarData(entries, ratingType) {
  let data = []
  let monthVals = {}
  let dayCount = 0

  for (let i = entries.length - 1; i >= 0; i--) {
    let currentMonth = entries[i].createdAt.split('-')[1]
    dayCount++

    if (!monthVals[currentMonth]) {
      if (ratingType === 'FiveStars' && data.length) {
        data[data.length - 1].value = (
          data[data.length - 1].value / dayCount
        ).toFixed(2)
        dayCount = 0
      }
      monthVals[currentMonth] = true
      data.push({
        month: currentMonth,
        value: entries[i].value
      })
    } else {
      data[data.length - 1].value += entries[i].value
      if (i === 0 && ratingType === 'FiveStars') {
        data[data.length - 1].value = (
          data[data.length - 1].value / dayCount
        ).toFixed(2)
      }
    }
  }
  return data
}

const BarChart = props => {
  const {entries, ratingType} = props
  const data = getBarData(entries, ratingType)

  return (
    <div className="barChartCont">
      <div>
        {ratingType === 'FiveStars' ? (
          <h2>Monthly Averages:</h2>
        ) : (
          <h2>Monthly Totals:</h2>
        )}
      </div>
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="month"
        margin={{top: 20, right: 20, bottom: 20, left: 20}}
        padding={0.4}
        colors={{scheme: 'set2'}}
        colorBy="index"
        borderColor={{from: 'color', modifiers: [['darker', '1.5']]}}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        labelSkipWidth={14}
        labelSkipHeight={13}
        labelTextColor={{from: 'color', modifiers: [['brighter', '2']]}}
        isInteractive={false}
        animate={false}
      />
    </div>
  )
}

export default BarChart
