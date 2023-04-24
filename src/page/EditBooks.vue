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
        @editBook="editBooks"
      />
    </v-row>
    <Popup
      ref="modalName"
    >
      <v-alert
        v-if="isSuccessPostBook"
        class="alert"
        type="success"
      >
        Книга успешно создана
      </v-alert>
      <v-alert
        v-if="isErrorPostBook"
        type="error"
      >
        Произошла ошибка
      </v-alert>
      <FormAddBooks @createBook="postBook" />
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
		isSuccessPostBook: false,
		isErrorPostBook: false,
	}),
	mounted() {
		this.getBooks();
	},
	methods: {
		async postBook(form) {
			try {
				await api.post("/books", form);
				this.isSuccessPostBook = true;
			} catch (e) {
				this.isErrorPostBook = true;
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
		editBooks(book) {
		}
	}
}
</script>

<style>
.text {
  color: rebeccapurple;
}
</style>
