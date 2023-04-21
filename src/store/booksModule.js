export default {
  state: {
    basketBook: [],
  },
  mutations: {
    deleteBasketBook(state, payload) {
      console.log(payload)
      state.basketBook = [...state.basketBook].filter(book => book._id !== payload._id)
      // state.basketBook = state.basketBook.filter(book => book.id === payload.id)
    },
    addBasketBook(state, payload) {
      state.basketBook = [...state.basketBook, payload]
    },
  },
  getters: {
    getAllBasketBooks(state) {
      return state.basketBook
    },
    // deleteBasketBook(state, payload) {
    //   console.log(payload)
    //
    //   state.basketBook = [...state.basketBook].filter(book => book._id !== payload._id)
    //   // state.basketBook = state.basketBook.filter(book => book.id === payload.id)
    // },
  },
}
