import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HabitThumb, MakeHabitModal} from './'

export const UserHome = props => {
  const {email, habits} = props

  return (
    <div id="userHome">
      <h2>Welcome back, {email}</h2>
      <div id="homepageDaySelector">
        <button>Previous</button>
        <h2>01-23-2020</h2>
        <button>Next</button>
      </div>
      {habits.map(habit => {
        return <HabitThumb key={habit.id} habit={habit} />
      })}
      <MakeHabitModal />
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email,
    habits: state.habits
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string,
  habits: PropTypes.array
}
