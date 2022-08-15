import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keepAliveList:[]
  },
  mutations: {

    updateAliveList(state, { name, status }) {
      if (status) {
        state.keepAliveList.push(name);
      } else {
        console.log("123123123213213")

        const index = state.keepAliveList.indexOf(name);
        index >= 0 && state.keepAliveList.splice(index, 1);
      }
    },

    data(){
       console.log("20220815")
    }
  },
  actions: {
  },
  modules: {
  }
})
