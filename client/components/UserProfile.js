import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'

class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {logout} = this.props
    return (
      <button onClick={logout} type="button">
        Logout
      </button>
    )
  }
}

const mapDistpach = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDistpach)(UserProfile)
