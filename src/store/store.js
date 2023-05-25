import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token:undefined,
    passwords:[],
    tokenPassword:undefined,
  },
  mutations: {
    setToken(state, payload) {
        state.token = payload
    },
    setPasswords(state,passwords) {
        state.passwords = passwords
    },
    addPassword(state, payload) {
        var password = {app:payload.app, password:payload.password}
        state.passwords.push(password)
    },
    editPassword(state,payload) {
      var password = state.passwords.find(em=> em.app == payload.app)
      password.password = payload.password
    },
    removePassword(state, payload) {
        state.passwords.splice(state.passwords.indexOf(payload))
    },
    saveTokenPassword(state,payload) {
        state.tokenPassword = payload
    },
    clearPassword(state) {
        state.tokenPassword = undefined
    }
  },
  actions:{
      setToken(context,payload) {
          context.commit("setToken",payload)
      },
      addPassword(context, payload) {
          context.commit("addPassword", payload)
      },
      editPassword(context,payload) 
      {
        context.commit("editPassword",payload)
      },
      removePassword(context, payload) {
          context.commit("removePassword", payload)
      },
      saveTokenPassword(context,payload) {
          context.commit("saveTokenPassword", payload)
      },
      clearPassword(context){
          context.commit("clearPassword")
      },
      setPasswords(context, payload) {
          context.commit("setPasswords", payload)
      }
  }
})
export default store