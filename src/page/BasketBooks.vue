<template>
  <div>
    <v-container>
      <v-row>
        <Book
          v-for="book in allBookBasket"
          :key="book._id"
          :book="book"
          :is-button-basket-page="true"
        >
          <v-btn
            block
            color="black"
            text
            @click="deleteBookBasket(book)"
          >
            Удалить из корзины
          </v-btn>
        </Book>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Book from "@/components/Book";
import {mapMutations} from "vuex";
import Select from "@/components/Toolbar";
import SelectCustom from "@/components/Toolbar";

export default {
	name: "BasketPage",
	components: {Book},
	data: () => ({
		genre: [],
		author: [],
	}),
	methods: {
		...mapMutations([
			"deleteBasketBook",
		]),
		deleteBookBasket(book) {
			this.deleteBasketBook(book)
		},
	},
	computed: {
		allBookBasket() {
			return this.$store.getters.getAllBasketBooks
		}
	}
}
</script>

<style>

</style>
