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
    return (
      <div id="singleHabit">
        <div id="singleHabitTop">
          <img src={`/${singleHabit.imgPath}`} />
          <h1>{singleHabit.name}</h1>
        </div>
        <div id="singleHabitEntries">
          {entries &&
            entries.map(entry => {
              return (
                <div key={entry.id}>
                  <h3>
                    {entry.createdAt.slice(0, 10)}: {entry.value}
                  </h3>
                </div>
              )
            })}
        </div>
        <div id="singleHabitAnalysis">
          <CalendarHeatmap
            startDate={new Date('2016-01-01')}
            endDate={new Date('2016-02-04')}
            showMonthLabels={false}
            values={[
              {date: '2016-01-02', count: 1},
              {date: '2016-01-04', count: 3},
              {date: '2016-01-10', count: 4},
              {date: '2016-01-30', count: 2}
            ]}
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
            DELETE HABIT
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
