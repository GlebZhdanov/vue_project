<template>
  <v-container>
    <v-btn @click="$refs.modalNameAdd.openPopup()">
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
      ref="modalNameAdd"
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
    <Popup
      ref="modalNameEdit"
    >
      <FormEditBooks
        v-model="booksEdit"
        @editBook="editPostBooks"
      />
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
import FormEditBooks from "@/components/FormEditBooks";
export default {
	components: {FormEditBooks,FormAddBooks,Book, Popup},
	data: () => ({
		books: [],
		booksEdit: {},
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
				console.log(form)
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
				console.log(response)
				this.books = response.data;
			} catch (e) {
				console.log(e)
			}
		},
		async editPostBooks() {
			try {
				 await api.put("/books/" + this.booksEdit._id, {
					author: this.booksEdit.author,
					cover: this.booksEdit.cover,
					genre: this.booksEdit.genre,
					price: this.booksEdit.price,
					title: this.booksEdit.title,
					year: this.booksEdit.year,
				});
			} catch (e) {
				console.log(e)
			}
		},
		editBooks(book) {
			this.booksEdit = book
			this.$refs.modalNameEdit.openPopup()
		}
	}
}
</script>

<style>
.text {
  color: rebeccapurple;
}
</style>
