import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: undefined,
      name: undefined,
      username: undefined,
      token: undefined
    },
    admin: false,
    customers: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      if (state.user.token !== undefined) {
        jwt.verify(state.user.token, window.config.APP_SECRET, (err, decoded) => {
          if (err || !decoded) state.admin = false
          state.admin = decoded.admin
        })
      }
    },
    SAVE_USER(state) {
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    RESTORE_USER(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
      if (state.user.token !== undefined) {
        jwt.verify(state.user.token, window.config.APP_SECRET, (err, decoded) => {
          if (err || !decoded) state.admin = false
          state.admin = decoded.admin
        })
      }
    },
    REMOVE_USER(state) {
      state.admin = false
      Object.keys(state.user).forEach(key => {
        state.user[key] = undefined
      })
    },
    SET_CUSTOMERS(state, customers) {
      state.customers = customers
    },
    SET_ADMIN(state) {
      state.admin = true
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
    },
    actionSetAdmin(context) {
      context.commit('SET_ADMIN')
    }
  }
})
