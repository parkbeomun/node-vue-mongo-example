import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  getters: {

  },
  mutations: {
    LOGIN (state, {accessToken}) {

    },
    LOGOUT (state) {
      state.accessToken = null
    }
  },

  actions: {
    LOGIN ({commit}, {email, password}) {
      return axios.post(`${resourceHost}/api/auth/login`,{email, password})
        .then(({data}) => commit('LOGIN', data))
    },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    },
  }
})
