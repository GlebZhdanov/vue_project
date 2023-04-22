<template>
  <div>
    <v-container>
      <v-row>
        <Book
          v-for="book in books"
          :book="book"
        />
      </v-row>
    </v-container>
    <v-btn
      elevation="2"
      raised
      @click="postBooksTest"
    >
      Получить книги
    </v-btn>
  </div>
</template>

<script>
import Book from "@/components/Book";
import {api} from "@/api/api";
export default {
	components: {Book},
	data: () => ({
		books: [],
		booksTest: [
			{title: "Боб",author: "Толкин",year: "2020",genre: "Фантастика",price: 100, cover: {image: "2.jpeg"}},
			{title: "Боб",author: "Толкин",year: "20220",genre: "Фантастика",price: 100, cover: {image: "2.jpeg"}},
			{title: "Боб",author: "Толкин",year: "202120",genre: "Фантастика",price: 100, cover: {image: "3.jpeg"}},
			{title: "Боб",author: "Толкин",year: "202120",genre: "Фантастика",price: 100, cover: {image: "4.jpeg"}},
			{title: "Боб",author: "Толкин",year: "20220",genre: "Фантастика",price: 100, cover: {image: "5.jpeg"}},
			{title: "Боб",author: "Толкин",year: "202120",genre: "Фантастика",price: 100, cover: {image: "6.jpeg"}},
			{title: "Боб",author: "Толкин",year: "202120",genre: "Фантастика",price: 100, cover: {image: "7.jpeg"}},
			{title: "Боб",author: "Толкин",year: "20220",genre: "Фантастика",price: 100, cover: {image: "8.jpeg"}},
			{title: "Боб",author: "Толкин",year: "202120",genre: "Фантастика",price: 100, cover: {image: "9.jpeg"}},
			{title: "Боб",author: "Толкин",year: "202120",genre: "Фантастика",price: 100, cover: {image: "10.jpeg"}},
		]
	}),
	mounted() {
		this.getBooks();
	},
	methods: {
		async getBooks() {
			try {
				const response = await api.get("/books");
				this.books = response.data;
			} catch (e) {
				console.log(e)
			}
		},
		async postBooksTest() {
			try {
				await Promise.all(
					this.booksTest.map(async book => await api.post("/books",book))
				)
			} catch (e) {
				console.log(e)
			}
		},
	}
}
</script>

<style>

</style>
