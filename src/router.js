import Vue from "vue"
import VueRouter from "vue-router"
import MainPage from "@/page/MainPage"
import EditBooks from "@/page/EditBooks"
import BasketBook from "@/page/BasketBooks"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: MainPage,
	},
	{
		path: "/edit",
		component: EditBooks,
	},
	{
		path: "/basket",
		component: BasketBook,
	},
]

export default new VueRouter({
	mode: "history",
	routes,
})
