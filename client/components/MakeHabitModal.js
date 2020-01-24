import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {makeHabit} from '../store'

const customStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage:
      'linear-gradient(to bottom right, rgb(29, 29, 108),rgb(3, 3, 36)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px'
  }
}

Modal.setAppElement('#app')

class MakeHabitModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false,
      name: '',
      ratingType: 'Binary'
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00'
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {name, ratingType} = this.state
    this.props.makeHabit({name, ratingType})
    this.setState({
      name: '',
      ratingType: ''
    })
    this.closeModal()
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.openModal} className="modal">
          Make New Habit
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={this.handleSubmit} className="modalForm">
            <label htmlFor="name" className="modalFormText">
              Habit Name:
            </label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              className="modalFormInput"
            />

            <label htmlFor="ratingType" className="modalFormText">
              Rating Type:
            </label>
            <select
              type="text"
              name="ratingType"
              value={this.state.ratingType}
              onChange={this.handleChange}
              className="modalFormInput"
            >
              <option value="Binary">Binary</option>
              <option value="FiveStars">FiveStars</option>
              <option value="Counter">Counter</option>
              })}
            </select>

            <button type="submit" className="modalFormButton">
              Submit
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    makeHabit: habitInfo => dispatch(makeHabit(habitInfo))
  }
}

export default connect(mapState, mapDispatch)(MakeHabitModal)

MakeHabitModal.propTypes = {
  makeHabit: PropTypes.func.isRequired
}
