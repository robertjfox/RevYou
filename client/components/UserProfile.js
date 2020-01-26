import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logout, deleteHabit} from '../store'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deleteToggle: false
    }

    this.toggleDelete = this.toggleDelete.bind(this)
  }

  toggleDelete() {
    this.setState({
      deleteToggle: !this.state.deleteToggle
    })
  }

  render() {
    const {logout, user, habits, deleteHabit} = this.props
    return (
      <div id="userProfile">
        <div id="userProfileInfo">
          <h2>
            Name: {user.firstName} {user.lastName}
          </h2>
          <h2>Email: {user.email}</h2>
          <h2>User Since: {user.createdAt.slice(0, 10)}</h2>
        </div>
        {this.state.deleteToggle && (
          <div>
            {habits.map(habit => (
              <div className="deleteHabitRow" key={habit.id}>
                <h2>{habit.name}</h2>
                <button type="button" onClick={() => deleteHabit(habit.id)}>
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="userProfileButton"
          type="button"
          onClick={this.toggleDelete}
        >
          {this.state.deleteToggle ? 'Hide Habits' : 'Delete Habits'}
        </button>
        <button className="userProfileButton" onClick={logout} type="button">
          Logout
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    habits: state.habits
  }
}

const mapDistpach = dispatch => {
  return {
    logout: () => dispatch(logout()),
    deleteHabit: habitId => dispatch(deleteHabit(habitId))
  }
}

export default connect(mapState, mapDistpach)(UserProfile)
