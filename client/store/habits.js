import axios from 'axios'
import history from '../history'

const GOT_HABITS = 'GOT_HABITS'
const MADE_HABIT = 'MAKE_HABIT'
// const DELETED_HABIT = 'DELETE_HABIT'

const initialState = []

const gotHabits = habits => ({type: GOT_HABITS, habits})
const madeHabit = habit => ({type: MADE_HABIT, habit})
// const deletedHabit = habit => ({type: DELETED_HABIT, habit})

export const getHabits = () => async dispatch => {
  try {
    const res = await axios.get(`/api/habits`)
    dispatch(gotHabits(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const makeHabit = habitInfo => async dispatch => {
  try {
    const res = await axios.post(`/api/habits`, habitInfo)
    dispatch(madeHabit(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteHabit = habitId => async dispatch => {
  try {
    await axios.delete(`/api/habits/${habitId}`)
    dispatch(getHabits())
    history.push('/home')
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_HABITS:
      return action.habits
    case MADE_HABIT:
      return [...state, action.habit]
    default:
      return state
  }
}
