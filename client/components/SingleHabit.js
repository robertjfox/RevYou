import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Analysis} from './'

class SingleHabit extends Component {
  render() {
    const {habitId} = this.props.match.params
    const {habits, entries} = this.props
    const singleHabit = habits.find(habit => habit.id === Number(habitId))
    if (singleHabit) {
      var {ratingType} = singleHabit
      var habitEntries = entries.filter(
        entry => entry.habitId === singleHabit.id
      )
    }

    return (
      <div>
        {singleHabit ? (
          <div id="singleHabit">
            <div id="singleHabitTop">
              <h1>{singleHabit.name}</h1>
            </div>
            <Analysis entries={habitEntries} ratingType={ratingType} />
          </div>
        ) : (
          <div>Habit Not Found</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    habits: state.habits,
    entries: state.entries
  }
}

export default connect(mapState)(SingleHabit)

SingleHabit.propTypes = {
  habits: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired
}
