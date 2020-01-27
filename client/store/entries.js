import axios from 'axios'

const GOT_ENTRIES = 'GOT_ENTRIES'
const UPDATED_ENTRIES = 'UPDATED_ENTRIES'

const initialState = []

const gotEntries = entries => ({type: GOT_ENTRIES, entries})
const updatedEntries = entries => ({type: UPDATED_ENTRIES, entries})

export const getEntries = () => async dispatch => {
  try {
    const res = await axios.get(`/api/entries`)
    dispatch(gotEntries(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateEntries = entries => async dispatch => {
  try {
    for (let i = 0; i < entries.length; i++) {
      await axios.put(`/api/entries/${entries[i].id}`, entries[i])
    }
    dispatch(updatedEntries(entries))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ENTRIES:
      return action.entries
    case UPDATED_ENTRIES:
      for (let i = 0; i < action.entries.length; i++) {
        for (let j = 0; j < state.length; j++) {
          if (action.entries[i].id === state[j].id) {
            state[j].id = action.entries[i].id
          }
        }
      }
      return state
    default:
      return state
  }
}
