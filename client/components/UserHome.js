import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HabitThumb, MakeHabitModal} from './'

export const UserHome = props => {
  const {firstName, email, habits} = props

  // var now = new Date()
  // var millisTill10 =
  //   new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 59, 0, 0) -
  //   now
  // console.log(millisTill10)
  // if (millisTill10 < 0) {
  //   millisTill10 += 86400000
  // }
  // setTimeout(function() {
  //   alert("It's 10am!")
  // }, millisTill10)

  return (
    <div id="userHome">
      <h2 className="homePageWelcome">Welcome back, {firstName}!</h2>
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
