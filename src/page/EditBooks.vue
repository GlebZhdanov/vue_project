<template>
  <v-container>
    <v-row
      align="center"
      class="pt-10"
    >
      <v-btn
        elevation="2"
        raised
        class="mr-5 ml-4"
        color="success"
        @click="postBooksTest"
      >
        Создание тестовых книг
      </v-btn>
      <v-btn @click="$refs.modalNameAdd.openPopup()">
        Создать книгу
      </v-btn>
    </v-row>
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
      <FormAddBooks
        @createBook="postBook"
      />
      <AlertRequest
        :is-error-request="isErrorRequest"
        :is-success-request="isSuccessRequest"
        :is-popup="true"
      />
    </Popup>
    <Popup
      ref="modalNameEdit"
    >
      <FormEditBooks
        v-model="booksEdit"
        @editBook="editPostBooks"
      />
      <AlertRequest
        :is-error-request="isErrorRequest"
        :is-success-request="isSuccessRequest"
        :is-popup="true"
      />
    </Popup>
    <AlertRequest
      :is-error-request="isErrorRequest"
      :is-success-request="isSuccessRequest"
    />
  </v-container>
</template>

<script>
import FormAddBooks from "@/components/FormAddBooks";
import Book from "@/components/Book";
import Popup from "@/components/Popup";
import {api} from "@/api/api";
import FormEditBooks from "@/components/FormEditBooks";
import AlertRequest from "@/components/AlertRequest";
export default {
	components: {AlertRequest,FormEditBooks,FormAddBooks,Book, Popup},
	data: () => ({
		show: true,
		books: [],
		booksEdit: {},
		isSuccessRequest: false,
		isErrorRequest: false,
		booksTest: [
			{title: "Тьма после рассвета",author: "Александра Маринина",year: 1994,genre: "История",price: 3, cover: {image: "1.jpeg", nameCover: "Обложка 1"}},
			{title: "Шатун",author: "Ерофей Трофимов",year: 1925195,genre: "История",price: 252, cover: {image: "2.jpeg", nameCover: "Обложка 2"}},
			{title: "Хоббит туда и обратно",author: "Толкин",year: 1996,genre: "Фантастика",price: 32, cover: {image: "3.jpeg", nameCover: "Обложка 3"}},
			{title: "Властелин колец",author: "Толкин",year: 1997,genre: "Фантастика",price: 82, cover: {image: "4.jpeg", nameCover: "Обложка 4"}},
			{title: "Родная кровь",author: "Anne Dar",year: 1998,genre: "Комедия",price: 9, cover: {image: "5.jpeg", nameCover: "Обложка 5"}},
			{title: "Прыжок",author: "Сергей Лукьяненко",year: 192299,genre: "Комедия",price: 622, cover: {image: "6.jpeg", nameCover: "Обложка 6"}},
			{title: "Гиблые земли",author: "Альбина Нури",year: 20100,genre: "Боевик",price: 7, cover: {image: "7.jpeg", nameCover: "Обложка 7"}},
			{title: "Обитель",author: "Прилепин",year: 20101,genre: "Боевик",price: 81, cover: {image: "8.jpeg", nameCover: "Обложка 8"}},
			{title: "Детективное путешествие",author: "Татьяна Устинова",year: 20202,genre: "Детектив",price: 10, cover: {image: "9.jpeg", nameCover: "Обложка 9"}},
			{title: "Боб",author: "Елена Бриолле",year: 20403,genre: "Комедия",price: 113, cover: {image: "10.jpeg", nameCover: "Обложка 10"}},
		],
	}),
	computed: {

	},
	mounted() {
		this.getBooks();
	},
	methods: {
		async postBook(form) {
			try {
				await api.post("/books", form);
				console.log(form)
				this.isSuccessRequest = true;
				this.handlerRequest()
			} catch (e) {
				this.isErrorRequest = true;
				console.log(e)
			}
		},
		async deleteBook(id) {
			try {
				await api.delete("/books/"+ id);
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
				this.isSuccessRequest = true;
				this.handlerRequest()
			} catch (e) {
				this.isErrorRequest = true;
				console.log(e)
			}
		},
		async postBooksTest() {
			try {
				await Promise.all(
					this.booksTest.map(async book => await api.post("/books",book))
				)
				this.isSuccessRequest = true;
				this.handlerRequest()
			} catch (e) {
				this.isErrorRequest = true;
				this.handlerRequest()
				console.log(e)
			}
		},
		editBooks(book) {
			this.booksEdit = book
			this.$refs.modalNameEdit.openPopup()
		},
		handlerRequest() {
			setTimeout(() => {
				this.isSuccessRequest = false;
				this.isErrorRequest = false;
			},2000)
		},
		// computed: {
		// 	deleteBookLocal(id) {
		// 		this.books.filter(book => book._id === id);
		// 	}
		// }
	}
}
</script>

<style>
#example-2 {
  z-index: 222;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>
