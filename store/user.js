export const state = () => ({
  data: {},
})

export const getters = {
  isAuthenticated: (state) => {
    return !!state.data.id
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.data = user
  },
}

export const actions = {
  fetch({ dispatch }) {
    return this.$axios.$get('/users').then((res) => {
      dispatch('setSession', res.data)
    })
  },

  login({ dispatch }, { username, password, remember }) {
    return this.$axios.$post('/login', { username, password, remember }).then(() => {
      dispatch('fetch')
    })
  },
  logout({ dispatch }) {
    dispatch('removeSession')
  },

  setSession({ commit }, user) {
    commit('SET_USER', user)
    this.$cookies.set(`user`, user, { secure: true, sameSite: true, path: '/' })
  },
  removeSession({ commit }) {
    commit('SET_USER', {})
    this.$cookies.removeAll()
  },
}
