import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSingleHabit, deleteHabit} from '../store/'
import CalendarHeatmap from 'react-calendar-heatmap'

class SingleHabit extends Component {
  componentDidMount() {
    const {habitId} = this.props.match.params
    this.props.getSingleHabit(habitId)
  }

  render() {
    const {habitId} = this.props.match.params
    const {singleHabit, deleteHabit} = this.props
    const {entries} = singleHabit
    const values = []
    if (entries) {
      entries.forEach(entry =>
        values.push({
          date: entry.createdAt.slice(0, 10),
          count: entry.value
        })
      )
    }

    const today = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    return (
      <div id="singleHabit">
        <div id="singleHabitTop">
          {/* <img src={`/${singleHabit.imgPath}`} /> */}
          <h1>{singleHabit.name}</h1>
        </div>
        <div id="singleHabitAnalysis">
          <h2>Past 30 Days:</h2>
          <CalendarHeatmap
            startDate={thirtyDaysAgo}
            endDate={today}
            showMonthLabels={false}
            values={values}
            classForValue={value => {
              if (!value) {
                return 'color-empty'
              }
              return `color-scale-${value.count}`
            }}
          />
        </div>
        <div id="singleHabitBottom">
          <button type="button" onClick={() => deleteHabit(habitId)}>
            Delete Habit
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleHabit: state.singleHabit
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleHabit: habitId => dispatch(getSingleHabit(habitId)),
    deleteHabit: habitId => dispatch(deleteHabit(habitId))
  }
}

export default connect(mapState, mapDispatch)(SingleHabit)

SingleHabit.propTypes = {
  singleHabit: PropTypes.object.isRequired,
  getSingleHabit: PropTypes.func.isRequired,
  deleteHabit: PropTypes.func.isRequired
}
