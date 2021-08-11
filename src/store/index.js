import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: undefined,
      username: undefined,
      token: undefined
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SAVE_USER(state) {
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
    actionSetUser(context, user) {
      context.commit('SET_USER', user)
    },
    actionSaveUser(context) {
      context.commit('SAVE_USER') 
    }
  }
})
