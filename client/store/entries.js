import axios from 'axios'

const GOT_ENTRIES = 'GOT_ENTRIES'

const initialState = []

const gotEntries = entries => ({type: GOT_ENTRIES, entries})

export const getEntries = () => async dispatch => {
  try {
    const res = await axios.get(`/api/entries`)
    dispatch(gotEntries(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ENTRIES:
      return action.entries
    default:
      return state
  }
}
