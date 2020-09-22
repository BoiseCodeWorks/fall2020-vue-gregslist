import Vue from 'vue'
import Vuex from 'vuex'
import CarStore from './modules/CarStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cars: [],
    activeCar: {}
  },
  mutations: {
    setResource(state, payload) {
      state[payload.resource] = payload.data
    },
    addResource(state, payload) {
      let resource = state[payload.resource]
      if (Array.isArray(resource)) {
        resource.push(payload.data)
      }
      else {
        console.error(`Cannot add to ${payload.resource} as it is not an array`)
      }
    },
    removeResource(state, payload) {
      let resource = state[payload.resource]
      if (Array.isArray(resource)) {
        resource = resource.filter(c => c.id != payload.id)
      }
      else {
        console.error(`Cannot remove from ${payload.resource} as it is not an array`)
      }

    }
  },
  actions: {},
  modules: {
    CarStore
  }
})
