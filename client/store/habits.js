import axios from 'axios'
import history from '../history'
import {madeEntry} from './'

const GOT_HABITS = 'GOT_HABITS'
const MADE_HABIT = 'MAKE_HABIT'

const initialState = []

const gotHabits = habits => ({type: GOT_HABITS, habits})
const madeHabit = habit => ({type: MADE_HABIT, habit})

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
    console.log(res.data)
    dispatch(madeHabit(res.data.habit))
    madeEntry(res.data.entry)
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
