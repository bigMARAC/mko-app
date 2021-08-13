import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: undefined,
      name: undefined,
      username: undefined,
      token: undefined
    },
    customers: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SAVE_USER(state) {
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    RESTORE_USER(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    REMOVE_USER(state) {
      Object.keys(state.user).forEach(key => {
        state.user[key] = undefined
      })
    },
    SET_CUSTOMERS(state, customers) {
      state.customers = customers
    }
  },
  actions: {
    actionSetUser(context, user) {
      context.commit('SET_USER', user)
    },
    actionSaveUser(context) {
      context.commit('SAVE_USER') 
    },
    actionRestoreUser(context) {
      context.commit('RESTORE_USER')
    },
    actionRemoveUser(context) {
      context.commit('REMOVE_USER')
    },
    actionSetCustomers(context, customers) {
      context.commit('SET_CUSTOMERS', customers)
    }
  }
})
