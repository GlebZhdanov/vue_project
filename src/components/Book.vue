<template>
  <v-col cols="4">
    <div class="book">
      <v-img
        :src="require('@/accets/img/cover' + book.cover.image)"
        max-height="200"
        max-width="200"
      />
    </div>
    <v-btn
      v-if="isDeleteButton"
      @click="deleteBook"
    >
      Удалить из корзины
    </v-btn>
    <v-btn
      v-else
      @click="addBook"
    >
      Добавить в корзину
    </v-btn>
  </v-col>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
	props: {
		book: {
			type: Object,
			required: true,
		},
		isDeleteButton: {
			type: Boolean,
			require: true,
		}
	},
	methods: {
		...mapMutations([
			"addBasketBook",
			"deleteBasketBook",
		]),
		...mapGetters(["getAllBasketBooks"]),
		addBook() {
			this.addBasketBook(this.book)
		},
		deleteBook() {
			this.deleteBasketBook(this.book)
		},
	},
	computed: {
		allBookBasket() {
			return this.$store.getters.getAllBasketBooks
		},
	}
}
</script>

<style>

.book {
  background-color: antiquewhite;
  width: 200px;
  cursor: pointer;
}
</style>
