import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FiveStars, Counter, Binary} from './'
import {Link} from 'react-router-dom'

class HabitThumb extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitted: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {submitted} = props
    return {
      submitted: submitted
    }
  }

  render() {
    const {habit, index, entry, updateHomeState} = this.props
    const {submitted} = this.state
    console.log(submitted)
    let RatingType

    if (habit.ratingType === 'FiveStars') {
      RatingType = FiveStars
    }

    if (habit.ratingType === 'Counter') {
      RatingType = Counter
    }

    if (habit.ratingType === 'Binary') {
      RatingType = Binary
    }

    return (
      <div id="habitThumb" style={{animationDelay: `${index / 8}s`}}>
        <div id="habitLink">
          <Link to={`/singleHabit/${habit.id}`}>
            <img src={'/' + habit.imgPath} />
          </Link>
        </div>
        {submitted ? (
          <div id="submissionConfirm">
            <h3>Entry Submitted</h3>
          </div>
        ) : (
          <div id="habitRatingCont">
            <RatingType entry={entry} updateHomeState={updateHomeState} />
          </div>
        )}
      </div>
    )
  }
}

export default HabitThumb

HabitThumb.propTypes = {
  habit: PropTypes.object
}
