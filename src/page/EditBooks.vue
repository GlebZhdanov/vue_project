<template>
  <v-container>
    <v-btn @click="$refs.modalName.openPopup()">
      Создать книгу
    </v-btn>
    <v-row>
      <Book
        v-for="book in books"
        :book="book"
        :is-button-edit-page="true"
        @delete="deleteBook"
      />
    </v-row>
    <Popup
      ref="modalName"
    >
      <FormAddBooks />
    </Popup>
  </v-container>
  <!--    <FormAddBooks @create="postBook" />-->

  <!--    <Popup />-->
</template>

<script>
import FormAddBooks from "@/components/FormAddBooks";
import Book from "@/components/Book";
import Popup from "@/components/Popup";
import {api} from "@/api/api";
export default {
	components: {FormAddBooks,Book, Popup},
	data: () => ({
		books: [],
	}),
	mounted() {
		this.getBooks();
	},
	methods: {
		async postBook(form) {
			try {
				await api.post("/books", form)
			} catch (e) {
				console.log(e)
			}
		},
		async deleteBook(id) {
			try {
				await api.delete("/books/"+ id)
			} catch (e) {
				console.log(e)
			}
		},
		async getBooks() {
			try {
				const response = await api.get("/books");
				this.books = response.data;
			} catch (e) {
				console.log(e)
			}
		},
	}
}
</script>

<style>
.text {
  color: rebeccapurple;
}
</style>
