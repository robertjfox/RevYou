import React, {Component} from 'react'
import StarRatingComponent from 'react-star-rating-component'

class FiveStars extends Component {
  constructor() {
    super()

    this.state = {
      rating: 0
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue})
  }

  render() {
    const {rating} = this.state
    return (
      <div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          emptyStarColor="#fcfff4"
          starColor="rgb(235, 156, 71)"
          renderStarIcon={() => <span className="fiveStarsCharacter">★</span>}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    )
  }
}

export default FiveStars
