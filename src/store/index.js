
import Vuex from 'vuex'

export default new Vuex.Store({
	state: {
		token: null,
		user: null,
		authenticated: false,
		loggedIn: false
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		authenticate(state, user) {
			state.user = user
			state.authenticated = true
		},
		login(state) {
			state.loggedIn = true
		}
	},
	actions: {
		loginAlone({ commit }, { token }) {
			console.log('loginAlone');
			commit('setToken', token)
			commit('login')
		},
		authenticate({ commit }, { token, user }) {
			console.log('authenticate');
			commit('setToken', token)
			commit('authenticate', user)
		}
	},
	modules: {
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		isLoggedIn: state => state.loggedIn
	}
})
