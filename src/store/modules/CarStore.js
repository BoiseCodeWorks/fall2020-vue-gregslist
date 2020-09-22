import router from "../../router"
import { api } from "../../services/AxiosService"

export default {
  actions: {
    async getAllCars({ commit }) {
      try {
        let res = await api.get('cars')
        commit("setResource", { resource: "cars", data: res.data.data })
      } catch (error) {
        console.error(error)
      }

    },
    async getCarById({ commit }, id) {
      try {
        let res = await api.get('cars/' + id)
        commit("setResource", { resource: "activeCar", data: res.data.data })
      } catch (error) {
        console.error(error)
      }

    },
    async createCar({ commit }, newCar) {
      try {
        let res = await api.post('cars', newCar)
        //dispatch("getAllCars")
        commit("addResource", { resource: "cars", data: res.data.data })
        commit("setResource", { resource: "activeCar", data: res.data.data })
        router.push({ name: "CarDetails", params: { id: res.data.data._id } })
      } catch (error) {
        console.error(error)
      }

    },
    async bid({ commit }, bid) {
      try {
        let res = await api.put('cars/' + bid.id, bid)
        commit("setResource", { resource: "activeCar", data: res.data })
      } catch (error) {
        console.error(error)
      }

    },
    async deleteCar({ commit }, id) {
      try {
        await api.delete('cars/' + id)
        commit("removeResource", { resource: "cars", id })
        commit("setResource", { resource: "activeCar", data: {} })
        // NOTE this will change the active route
        router.push({ name: "Cars" })
      } catch (error) {
        console.error(error)
      }
    }
  }
}