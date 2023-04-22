import Vue from "vue"
import Vuex from "vuex"
import booksModule from "@/store/booksModule"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		booksModule
	}
})
