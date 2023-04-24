<template>
  <v-card
    class="mx-auto my-12"
    max-width="300"
  >
    <v-img
      height="350px"
      :src="require('@/accets/img/cover' + book.cover.image)"
    />
    <v-card-title class="pa-4">
      {{ book.title }}
    </v-card-title>
    <v-card-text class="sa-4">
      <v-col
        class="mx-20 pa-0"
      >
        <div class="grey--text mb-3">
          Автор: {{ book.author }}
        </div>
        <div class="grey--text mb-3">
          Год: {{ book.year }}
        </div>
        <div class="grey--text mb-3">
          Жанр: {{ book.genre }}
        </div>
      </v-col>
    </v-card-text>
    <v-divider class="mx-4" />
    <v-btn
      v-if="isButtonBasketPage"
      block
      color="black"
      text
      @click="deleteBookBasket"
    >
      Удалить из корзины
    </v-btn>
    <v-btn
      v-if="isButtonEditPage"
      block
      color="black"
      text
      @click="deleteBook"
    >
      Удалить
    </v-btn>
    <v-btn
      v-if="isButtonEditPage"
      block
      color="black"
      text
      @click="addBook"
    >
      Редактировать
    </v-btn>
    <v-btn
      v-if="isButtonMainPage"
      block
      color="black"
      text
      @click="addBook"
    >
      Добавить в корзину
    </v-btn>
  </v-card>
<!--  <v-col cols="4">-->
<!--    <div class="book">-->
<!--      <v-img-->
<!--        :src="require('@/accets/img/cover' + book.cover.image)"-->
<!--        max-height="200"-->
<!--        max-width="200"-->
<!--      />-->
<!--    </div>-->
<!--    <v-btn-->
<!--      v-if="isDeleteButton"-->
<!--      @click="deleteBook"-->
<!--    >-->
<!--      Удалить из корзины-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--      v-else-->
<!--      @click="addBook"-->
<!--    >-->
<!--      Добавить в корзину-->
<!--    </v-btn>-->
<!--  </v-col>-->
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
	props: {
		book: {
			type: Object,
			required: true,
		},
		isButtonMainPage: {
			type: Boolean,
			require: true,
		},
		isButtonBasketPage: {
			type: Boolean,
			require: true,
		},
		isButtonEditPage: {
			type: Boolean,
			require: true,
		},
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
		deleteBookBasket() {
			this.deleteBasketBook(this.book)
		},
		deleteBook() {
			this.$emit("delete", this.book._id)
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

.block {
  color: red;
}
</style>
