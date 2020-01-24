import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const FiveStars = props => {
  return (
    <div className="fiveStars">
      <StarRatingComponent name="rate1" starCount={5} value={0} />
    </div>
  )
}

export default FiveStars
