export const state = () => ({
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
  setUnit (state, data) {
    state.unit.cost = data.cost
    state.unit.name = data.name
    state.unit._id = data._id
  }

  // for use real time
  // setUnit (state, data) {
  //   const calHours = data.minutes / 60
  //   state.unit.hours = parseInt(calHours)
  //   state.unit.minutes = parseInt((calHours - state.unit.hours) * 60)
  //   state.unit.cost = data.cost
  //   state.unit.is_over = data.is_over
  //   state.unit.name = data.name
  //   state.unit._id = data._id
  // }
}

export const getters = {
  getUnit (state) {
    return state.unit
  }
}
