<template>
  <div>
    <div v-if="!isBookLoading">
      <v-container
        class="d-flex flex-column justify-space-between"
        sm="2"
      >
        <v-select
          v-model="selectedGenre"
          :items="genre"
          label="Выберите жанры"
          multiple
        >
          <template #prepend-item>
            <v-list-item
              ripple
              @mousedown.prevent
              @click="toggleGenre"
            >
              <v-list-item-action>
                <v-icon :color="selectedGenre.length > 0 ? 'indigo darken-4' : ''">
                  {{ iconGenre }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Выбрать все жанры
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-1" />
          </template>
        </v-select>
        <v-select
          v-model="selectedAuthor"
          :items="getAuthorBook"
          label="Выберите авторов"
          multiple
          class="pt-0"
        >
          <template #prepend-item>
            <v-list-item
              ripple
              @mousedown.prevent
              @click="toggleAuthor"
            >
              <v-list-item-action>
                <v-icon :color="selectedAuthor.length > 0 ? 'indigo darken-4' : ''">
                  {{ iconAuthor }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Выбрать всех авторов
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-1" />
          </template>
        </v-select>
        <v-text-field
          v-model="searchName"
          class="ma-0 pa-0"
          placeholder="Поиск по названию фильма"
        />
        <v-col
          class="mx-20 pa-0"
          md="4"
        >
          <v-select
            v-model="selectedSort"
            class="ma-0"
            id-items:
            :items="items"
            label="Сортировка по цене и году"
            outlined
          />
        </v-col>
      </v-container>
      <v-container>
        <v-row>
          <Book
            v-for="book in filteredBooks"
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
  </div>
</template>

<script>
import Book from "@/components/Book";
import {api} from "@/api/api";
import Loader from "@/components/Loader";
import {mapMutations} from "vuex";
export default {
	components: {Loader,Book},
	data: () => ({
		items: [
			{value: "year", text: "Году издания"},
			{value: "price", text: "Цене"},
		],
		genre: [
			"История",
			"Фантастика",
			"Комедия",
			"Боевик",
			"Детектив",
		],
		selectedGenre: [],
		selectedAuthor: [],
		selectedSort: "",
		searchName: "",
		books: [],
		isBookLoading: false,
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

			return books;
		},

		likesAllGenre () {
			return this.selectedGenre.length === this.genre.length
		},
		likesSomeGenre () {
			return this.selectedGenre.length > 0 && !this.likesAllGenre
		},
		likesAllAuthor () {
			return this.selectedAuthor.length === this.getAuthorBook.length
		},
		likesSomeAuthor () {
			return this.selectedAuthor.length > 0 && !this.likesAllAuthor
		},
		getAuthorBook() {
			return  Array.from(new Set(this.books.map(books => books.author)));
		},
		iconGenre () {
			if (this.likesAllGenre) return "mdi-close-box"
			if (this.likesSomeGenre) return "mdi-minus-box"
			return "mdi-checkbox-blank-outline"
		},
		iconAuthor () {
			if (this.likesAllAuthor) return "mdi-close-box"
			if (this.likesSomeAuthor) return "mdi-minus-box"
			return "mdi-checkbox-blank-outline"
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
			try {
				this.isBookLoading = true;
				setTimeout( async () => {
					const response = await api.get("/books");
					this.books = response.data;
					this.isBookLoading = false;
				},600)
			} catch (e) {
				console.log(e)
			}
		},
		toggleGenre () {
			this.$nextTick(() => {
				if (this.likesAllGenre) {
					this.selectedGenre = []
				} else {
					this.selectedGenre = this.genre.slice()
				}
			})
		},
		toggleAuthor () {
			this.$nextTick(() => {
				if (this.likesAllAuthor) {
					this.selectedAuthor = []
				} else {
					this.selectedAuthor = this.getAuthorBook.slice()
				}
			})
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
