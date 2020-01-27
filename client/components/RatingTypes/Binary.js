import React, {Component} from 'react'

class Binary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      entryId: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    const {entry} = props
    if (props.entry && state.entryId !== props.entry.id) {
      return {
        value: entry.value,
        entryId: entry.id
      }
    } else {
      return null
    }
  }

  handleClick(e) {
    const upOrDown = e.target.name
    const {value} = this.state
    if (upOrDown === 'down' && value !== 0) {
      this.setState({
        value: value - 1
      })
    }
    if (upOrDown === 'up' && value !== 1) {
      this.setState({
        value: value + 1
      })
    }
  }

  render() {
    const {value} = this.state
    let className0, className1
    if (value === 0) {
      className0 = 'selectedThumb'
    } else {
      className1 = 'selectedThumb'
    }
    return (
      <div className="ratingBinary">
        <img
          src="/icons/thumbsDown.png"
          name="down"
          onClick={this.handleClick}
          className={className0}
        />
        <img
          src="/icons/thumbsUp.png"
          name="up"
          className="selectedThumb"
          onClick={this.handleClick}
          className={className1}
        />
      </div>
    )
  }
}

export default Binary
