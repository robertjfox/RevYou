import React from 'react'
import PropTypes from 'prop-types'
import {FiveStars, Counter, Binary} from './'
import {Link} from 'react-router-dom'

export const HabitThumb = props => {
  const {habit, index, entry, updateHomeState} = props
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
      <div id="habitRatingCont">
        <RatingType entry={entry} updateHomeState={updateHomeState} />
      </div>
    </div>
  )
}

export default HabitThumb

HabitThumb.propTypes = {
  habit: PropTypes.object
}
