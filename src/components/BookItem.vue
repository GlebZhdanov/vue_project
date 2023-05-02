<template>
  <v-container
    class="d-flex flex-column justify-space-between pb-0 pl-0 pr-0"
    sm="2"
  >
    <Toolbar
      :books="books"
      @update:genre="value => selectedGenre = value"
      @update:author="value => selectedAuthor = value"
      @update:name="value => searchName = value"
      @update:sort="value => selectedSort = value"
      @update:year="value => selectedYear = value"
    />
    <v-row>
      <Book
        v-for="book in filteredBooks"
        :key="book._id"
        :book="book"
      >
        <div v-if="isEditPage">
          <v-btn
            block
            color="black"
            text
            @click="deleteBook(book._id)"
          >
            Удалить
          </v-btn>
          <v-btn
            ref="parent-ref.modalNameEdit.openPopup()"
            block
            color="black"
            text
            @click="editBooks(book)"
          >
            Редактировать
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            block
            color="black"
            text
            :disabled="isBookDisabled(book)"
            @click="addBook(book)"
          >
            Добавить в корзину
          </v-btn>
        </div>
      </Book>
    </v-row>
    <h2
      v-if="filteredBooks.length <= 0"
      class="grey--text text-darken-1 text-center pt-10"
    >
      Книги не найдены
    </h2>
  </v-container>
</template>

<script>
import Book from "@/components/Book";
import Toolbar from "@/components/Toolbar";
import {mapMutations} from "vuex";
export default {
	name: "BookItem",
	components: {Toolbar,Book},
	props: {
		books: {
			type: Array,
			required: true,
		},
		isEditPage: {
			type: Boolean,
			required: false,
		}
	},
	data: () => ({
		selectedGenre: [],
		selectedAuthor: [],
		selectedYear: [],
		selectedSort: "",
		searchName: "",
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
		basketBooks() {
			return this.$store.getters.getAllBasketBooks;
		},
	},
	methods: {
		...mapMutations([
			"addBasketBook",
		]),
		isBookDisabled(book) {
			return this.basketBooks.some(item => item._id === book._id)
		},
		addBook(book) {
			this.addBasketBook(book)
		},
		deleteBook (id) {
			this.$emit("deleteBook", id);
		},
		editBooks (book) {
			this.$emit("editBooks", book);
		},
	}
}
</script>

<style>

</style>
