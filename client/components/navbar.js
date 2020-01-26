import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('hello')
    document.body.requestFullscreen()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <nav id="navBar">
            <img
              src="/icons/settings.png"
              className="navIcons"
              onClick={this.handleClick}
            />
            <Link to="/home">
              <h1 id="placeholderLogoText">RevYou</h1>
            </Link>
            <Link to="/userProfile">
              <img src="/icons/userProfile.png" className="navIcons" />
            </Link>
          </nav>
        ) : (
          <nav id="navBar">
            <Link to="/login">
              <h2>Login</h2>
            </Link>
            <h1 id="placeholderLogoText">RevYou</h1>
            <Link to="/signup">
              <h2>Sign Up</h2>
            </Link>
          </nav>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
