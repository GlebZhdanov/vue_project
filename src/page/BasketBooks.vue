<template>
  <div>
    <v-container>
      <v-row>
        <Book
          v-for="book in allBookBasket"
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

export default {
	name: "BasketPage",
	components: {Book},
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
