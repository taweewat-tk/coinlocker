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
  setUnit (state, payload) {
    state.unit.cost = payload.cost
    state.unit.name = payload.name
    state.unit._id = payload._id
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}

export const getters = {
  getUnit (state) {
    return state.unit
  },
  isLoading (state) {
    return state.loading
  }
}
