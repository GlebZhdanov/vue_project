<template>
  <v-card
    class="mx-auto my-12"
    max-width="270"
  >
    <v-img
      height="300px"
      :src="require('@/accets/img/cover' + book.cover.image)"
    />
    <v-card-title
      class="pa-4"
    >
      <h3 class="title">
        {{ book.title }}
      </h3>
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
        <div class="grey--text mb-3">
          Цена: {{ book.price }}
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
      ref="parent-ref.modalNameEdit.openPopup()"
      block
      color="black"
      text
      @click="editBook"
    >
      Редактировать
    </v-btn>
    <v-btn
      v-if="isButtonMainPage"
      block
      color="black"
      text
      :disabled="disabled"
      @click="addBook"
    >
      Добавить в корзину
    </v-btn>
  </v-card>
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
	data: () => ({
		disabled: false,
	}),
	methods: {
		...mapMutations([
			"addBasketBook",
			"deleteBasketBook",
		]),
		addBook() {
			this.addBasketBook(this.book)
		},
		deleteBookBasket() {
			this.deleteBasketBook(this.book)
		},
		deleteBook() {
			this.$emit("delete", this.book._id)
		},
		editBook() {
			this.$emit("editBook", this.book)
		},

	},
	// eslint-disable-next-line vue/order-in-components
	watch: {
		"$store.state.booksModule.basketBook": function() {
			 this.disabled = this.$store.getters.getAllBasketBooks.some(item => item === this.book);
		}
		// handledDisabledButton() {
		// 	return this.$store.getters.getAllBasketBooks.some(item => item === this.book);
		// }
	},
}
</script>

<style>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.book {
  background-color: antiquewhite;
  width: 200px;
  cursor: pointer;
}

.block {
  color: red;
}
</style>
