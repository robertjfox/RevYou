import React, {Component} from 'react'

class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const plusOrMinus = e.target.innerText
    const {count} = this.state
    if (plusOrMinus === '-' && count !== 0) {
      this.setState({
        count: count - 1
      })
    }
    if (plusOrMinus === '+') {
      this.setState({
        count: count + 1
      })
    }
  }

  render() {
    const {count} = this.state
    var style = {}
    if (count) {
      style = {color: 'rgb(235, 156, 71)'}
    }
    return (
      <div className="ratingCounter">
        <button
          type="button"
          onClick={this.handleClick}
          style={{touchAction: 'manipulation'}}
        >
          -
        </button>
        <h1 style={style}>{count}</h1>
        <button
          type="button"
          onClick={this.handleClick}
          style={{touchAction: 'manipulation'}}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
