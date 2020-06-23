import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    feeds: [],
  },
  mutations: {
    initialise: function(state) {
      let feeds = localStorage.getItem('feeds').split(',')
      if (feeds.length) {
        this.replaceState({ ...state, feeds })
      }
    },
    addFeed: function(state, payload) {
      state.feeds.push(payload)
    },
    removeFeed: function(state, payload) {
      for (let i = 0; i < state.feeds.length; i += 1) {
        if (state.feeds[i] === payload) {
          this.state.feeds.splice(i, 1)
          break
        }
      }
    },
  },
  getters: {
    getFeeds: function(state) {
      return state.feeds
    },
  },
})

store.subscribe((mutation, state) => {
  localStorage.setItem('feeds', state.feeds.join(','))
})

export default store
