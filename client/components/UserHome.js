import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HabitThumb, MakeHabitModal} from './'
import {updateEntries} from '../store'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      currentEntries: {},
      submitted: false
    }
    this.changeDate = this.changeDate.bind(this)
    this.updateHomeState = this.updateHomeState.bind(this)
    this.sendEntryUpdates = this.sendEntryUpdates.bind(this)
    this.toggleUpdateButton = this.toggleUpdateButton.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    const {entries} = props,
      {date} = state
    const dateToCompare = date.toISOString().slice(0, 10)
    const currentEntries = entries.filter(
      entry => entry.createdAt.slice(0, 10) === dateToCompare
    )
    console.log(currentEntries)
    return {
      currentEntries: currentEntries
    }
  }

  updateHomeState(entryId, value) {
    const entries = this.state.currentEntries
    entries.forEach(entry => {
      if (entry.id === entryId) {
        entry.value = value
      }
    })
    this.setState({
      currentEntries: entries
    })
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
      date: newDate,
      submitted: false
    })
  }

  sendEntryUpdates() {
    const {currentEntries} = this.state
    this.props.updateEntries(currentEntries)
    this.setState({
      submitted: true
    })
  }

  toggleUpdateButton() {
    this.setState({
      submitted: false
    })
  }

  render() {
    const {user, habits} = this.props
    const {date, currentEntries, submitted} = this.state
    const displayDate = date.toDateString().slice(4)
    return (
      <div id="userHome">
        <h2 className="homePageWelcome">Welcome back, {user.firstName}</h2>
        <div id="homepageDaySelector">
          <button type="button" onClick={this.changeDate}>
            PREV
          </button>
          <h2>{displayDate}</h2>
          <button type="button" onClick={this.changeDate}>
            NEXT
          </button>
        </div>
        <div>
          {habits.length
            ? habits.map((habit, index) => {
                let habitEntry = currentEntries.filter(
                  entry => entry.habitId === habit.id
                )
                let entry = habitEntry[0]
                return (
                  <HabitThumb
                    key={habit.id}
                    index={index}
                    habit={habit}
                    entry={entry}
                    submitted={submitted}
                    updateHomeState={this.updateHomeState}
                  />
                )
              })
            : ''}
        </div>
        <div id="userHomeBottom">
          <MakeHabitModal />
          {submitted ? (
            <button
              type="button"
              id="submitEntriesButton"
              onClick={this.toggleUpdateButton}
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              id="submitEntriesButton"
              onClick={this.sendEntryUpdates}
            >
              Submit
            </button>
          )}
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

const mapDispatch = dispatch => {
  return {
    updateEntries: entries => dispatch(updateEntries(entries))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  user: PropTypes.object,
  habits: PropTypes.array,
  entries: PropTypes.array,
  updateEntries: PropTypes.func
}
