import {ResponsiveBar} from '@nivo/bar'
import React from 'react'

function getBarData(entries, ratingType) {
  let dataObj = {},
    dataArray = []

  for (let i = entries.length - 1; i >= 0; i--) {
    let currentMonth = entries[i].createdAt.split('-')[1]
    let currentValue = entries[i].value

    if (dataObj[currentMonth]) {
      dataObj[currentMonth].value += currentValue
      dataObj[currentMonth].numDays += 1
    } else {
      dataObj[currentMonth] = {
        month: currentMonth,
        value: currentValue,
        numDays: 1
      }
    }
  }

  let months = Object.keys(dataObj)

  for (let i = 0; i < months.length; i++) {
    let currentMonth = months[i],
      value
    if (ratingType === 'FiveStars') {
      value = (
        dataObj[currentMonth].value / dataObj[currentMonth].numDays
      ).toFixed(2)
    } else {
      value = dataObj[currentMonth].value
    }
    dataArray.push({
      month: dataObj[currentMonth].month,
      value: value
    })
  }

  return dataArray
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
