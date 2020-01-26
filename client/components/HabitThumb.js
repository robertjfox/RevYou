import React from 'react'
import PropTypes from 'prop-types'
import {FiveStars, Counter, Binary} from './'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'

export const HabitThumb = props => {
  const {habit, index} = props
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
    <div
      id="habitThumb"
      //  style={{animationDelay: `${index}s`}}
    >
      <div id="habitLink">
        <Link to={`/singleHabit/${habit.id}`}>
          <img src={'/' + habit.imgPath} />
        </Link>
      </div>
      <div id="habitRatingCont">
        <RatingType />
      </div>
    </div>
  )
}

export default HabitThumb

HabitThumb.propTypes = {
  habit: PropTypes.object
}
