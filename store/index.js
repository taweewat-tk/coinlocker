export const state = () => ({
  loading: false,
  unit: {
    cost: 0,
    is_over: false,
    hours: 0,
    minutes: 0,
    name: '',
    _id: null
  }
})

export const mutations = {
  // for use duration time
  setUnit (state, payload) {
    state.unit.cost = payload.cost
    state.unit.name = payload.name
    state.unit._id = payload._id
  },
  setLoading (state, payload) {
    state.loading = payload
  }

  // for use real time
  // setUnit (state, payload) {
  //   const calHours = payload.minutes / 60
  //   state.unit.hours = parseInt(calHours)
  //   state.unit.minutes = parseInt((calHours - state.unit.hours) * 60)
  //   state.unit.cost = payload.cost
  //   state.unit.is_over = payload.is_over
  //   state.unit.name = payload.name
  //   state.unit._id = payload._id
  // }
}

export const getters = {
  getUnit (state) {
    return state.unit
  },
  isLoading (state) {
    return state.loading
  }
}

export const actions = {
  loading ({ commit }, isLoading) {
    commit('setLoading', isLoading)
  }
}
