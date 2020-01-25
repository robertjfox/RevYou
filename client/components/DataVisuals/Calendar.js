import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'

const Calendar = props => {
  const {entries} = props

  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const values = []

  if (entries) {
    entries.forEach(entry =>
      values.push({
        date: entry.createdAt.slice(0, 10),
        count: entry.value
      })
    )
    var average =
      entries.reduce((accum, entry) => {
        return accum + entry.value
      }, 0) / entries.length
  }

  return (
    <div className="calendarCont">
      <h2>Past 30 Days:</h2>
      <CalendarHeatmap
        startDate={thirtyDaysAgo}
        endDate={yesterday}
        showMonthLabels={false}
        values={values}
        classForValue={value => {
          if (!value) {
            return 'color-empty'
          }
          return `color-scale-${value.count}`
        }}
      />
      <h2>Average Per Day: {average}</h2>
    </div>
  )
}

export default Calendar
