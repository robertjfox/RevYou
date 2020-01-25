import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HabitThumb, MakeHabitModal} from './'

export const UserHome = props => {
  const {firstName, habits} = props

  return (
    <div id="userHome">
      <h2 className="homePageWelcome">Welcome back, {firstName}</h2>
      <div id="homepageDaySelector">
        <button type="button">PREV</button>
        <h2>01-23-2020</h2>
        <button type="button">NEXT</button>
      </div>
      <div>
        {habits.map(habit => {
          return <HabitThumb key={habit.id} habit={habit} />
        })}
      </div>
      <div id="makeHabitCont">
        <MakeHabitModal />
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    firstName: state.user.firstName,
    email: state.user.email,
    habits: state.habits
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  fistName: PropTypes.string,
  email: PropTypes.string,
  habits: PropTypes.array
}
