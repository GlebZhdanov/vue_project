export default {
	state: {
		basketBook: [],
	},
	mutations: {
		deleteBasketBook(state, payload) {
			state.basketBook = [...state.basketBook].filter(book => book._id !== payload._id)
		},
		addBasketBook(state, payload) {
			state.basketBook = [...state.basketBook, payload]
		},
	},
	getters: {
		getAllBasketBooks(state) {
			return state.basketBook
		},
	},
}
