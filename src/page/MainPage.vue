<template>
  <div>
    <div v-if="!isBookLoading">
      <v-container
        class="d-flex flex-column justify-space-between pb-0"
        sm="2"
      >
        <SelectCustom
          :get-author-book="getAuthorBook"
          :get-year-book="getYearBook"
          :get-genre-book="getGenreBook"
          @update:genre="value => selectedGenre = value"
          @update:author="value => selectedAuthor = value"
          @update:name="value => searchName = value"
          @update:sort="value => selectedSort = value"
          @update:year="value => selectedYear = value"
        />
      </v-container>
      <v-container>
        <v-row>
          <Book
            v-for="book in filteredBooks"
            :key="book._id"
            :book="book"
          >
            <v-btn
              block
              color="black"
              text
              :disabled="isBookDisabled(book)"
              @click="addBook(book)"
            >
              Добавить в корзину
            </v-btn>
          </Book>
        </v-row>
      </v-container>
    </div>
    <div>
      <Loader v-if="isBookLoading" />
    </div>
    <AlertRequest
      :is-error-request="isErrorRequestPage"
    />
  </div>
</template>

<script>
import Book from "@/components/Book";
import {api} from "@/api/api";
import Loader from "@/components/Loader";
import {mapMutations} from "vuex";
import AlertRequest from "@/components/AlertRequest";
import SelectCustom from "@/components/Toolbar";
export default {
	name: "MainPage",
	components: {SelectCustom,AlertRequest,Loader,Book},
	data: () => ({
		items: [
			{value: "year", text: "Году издания"},
			{value: "price", text: "Цене"},
		],
		selectedGenre: [],
		selectedAuthor: [],
		selectedYear: [],
		selectedSort: "",
		searchName: "",
		books: [],
		isBookLoading: false,
		isErrorRequestPage: false,
	}),
	computed: {
		filteredBooks() {
			let books = this.books;

			if(this.selectedSort) {
				books = books.sort((a, b) => a[this.selectedSort] - b[this.selectedSort])
			}
			if (this.searchName) {
				books = books.filter(book => book.title.toLowerCase().includes(this.searchName.toLowerCase()))
			}
			if(this.selectedGenre.length) {
				books = books.filter(book => this.selectedGenre.includes(book.genre))
			}
			if(this.selectedAuthor.length) {
				books = books.filter(book => this.selectedAuthor.includes(book.author))
			}
			if(this.selectedYear.length) {
				books = books.filter(book => this.selectedYear.includes(book.year))
			}

			return books;
		},
		getAuthorBook() {
			return  Array.from(new Set(this.books.map(books => books.author)));
		},
		getYearBook() {
			return  Array.from(new Set(this.books.map(books => books.year)));
		},
		getGenreBook() {
			return  Array.from(new Set(this.books.map(books => books.genre)));
		},
		basketBooks() {
			return this.$store.getters.getAllBasketBooks;
		},
	},
	mounted() {
		this.getBooks();
	},
	methods: {
		...mapMutations([
			"addBasketBook",
		]),
		async getBooks() {
			this.isBookLoading = true;
			try {
				const response = await api.get("/books");
				this.books = response.data;
				this.isBookLoading = false;
			} catch (e) {
				this.isErrorRequestPage = true;
			}
			finally {
				this.isBookLoading = false;
			}
		},
		isBookDisabled(book) {
			return this.basketBooks.some(item => item._id === book._id)
		},
		addBook(book) {
			this.addBasketBook(book)
		},
	},
}
</script>

<style>

</style>
