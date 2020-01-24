import axios from 'axios'

const GOT_SINGLE_HABIT = 'GOT_SINGLE_HABIT '

const initialState = {}

const gotSingleHabit = singleHabit => ({type: GOT_SINGLE_HABIT, singleHabit})

export const getSingleHabit = habitId => async dispatch => {
  try {
    const res = await axios.get(`/api/habits/${habitId}`)
    dispatch(gotSingleHabit(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_HABIT:
      return action.singleHabit
    default:
      return state
  }
}
