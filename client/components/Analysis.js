import React, {Component} from 'react'
import {Calendar, WheelChart, BarChart} from '.'

class BinaryAnalysis extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: 'calendar'
    }

    this.switchDataVisuals = this.switchDataVisuals.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  switchDataVisuals() {
    const {entries, ratingType} = this.props
    const {display} = this.state
    switch (display) {
      case 'calendar':
        return <Calendar entries={entries} ratingType={ratingType} />
      case 'wheelChart':
        return <WheelChart entries={entries} ratingType={ratingType} />
      case 'barChart':
        return <BarChart entries={entries} ratingType={ratingType} />
      default:
        return <h1>error</h1>
    }
  }

  toggleDisplay(e) {
    this.setState({
      display: e.target.value
    })
  }

  render() {
    return (
      <div id="singleHabitAnalysis">
        <div id="dataVisualContainer">{this.switchDataVisuals()}</div>
        <div id="visualSelector">
          <button type="button" value="calendar" onClick={this.toggleDisplay}>
            Calendar
          </button>
          <button type="button" value="wheelChart" onClick={this.toggleDisplay}>
            Wheel
          </button>
          <button type="button" value="barChart" onClick={this.toggleDisplay}>
            Bar Chart
          </button>
        </div>
      </div>
    )
  }
}

export default BinaryAnalysis
