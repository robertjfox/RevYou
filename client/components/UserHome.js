import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HabitThumb, MakeHabitModal} from './'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }

    this.changeDate = this.changeDate.bind(this)
  }

  changeDate(e) {
    const {date} = this.state
    const newDate = new Date()
    if (e.target.innerText === 'PREV') {
      newDate.setTime(date.getTime() - 86400000)
    }
    if (
      e.target.innerText === 'NEXT' &&
      date.getTime() + 86400000 < newDate.getTime()
    ) {
      newDate.setTime(date.getTime() + 86400000)
    }
    this.setState({
      date: newDate
    })
  }

  render() {
    const {user, habits, entries} = this.props
    const {date} = this.state
    const displayDate = date.toDateString()
    const dateToCompare = date.toISOString().slice(0, 10)
    const daysEntries = entries.filter(
      entry => entry.createdAt.slice(0, 10) === dateToCompare
    )
    return (
      <div id="userHome">
        <h2 className="homePageWelcome">Welcome back, {user.firstName}</h2>
        <div id="homepageDaySelector">
          <button type="button" onClick={this.changeDate}>
            PREV
          </button>
          <h3>{displayDate}</h3>
          <button type="button" onClick={this.changeDate}>
            NEXT
          </button>
        </div>
        <div>
          {habits.length
            ? habits.map((habit, index) => {
                let habitEntry = daysEntries.filter(
                  entry => entry.habitId === habit.id
                )
                let entry = habitEntry[0]
                return (
                  <HabitThumb
                    key={habit.id}
                    index={index}
                    habit={habit}
                    entry={entry}
                  />
                )
              })
            : ''}
        </div>
        <div id="userHomeBottom">
          <MakeHabitModal />
          <button type="submit" id="submitEntriesButton">
            Submit
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    habits: state.habits,
    entries: state.entries
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  user: PropTypes.object,
  habits: PropTypes.array,
  entries: PropTypes.array
}
