<template>
  <div>
    <v-card
      class="d-flex justify-space-between mb-6"
      sm="3"
    >
      <v-select
        v-model="selectedSort"
        class="mt-6"
        id-items:
        :items="items"
        label="Сортировка по цене и году"
        outlined
      />
      <v-select
        v-model="selectedSort"
        class="mt-6"
        id-items:
        :items="items"
        label="Сортировка по автору"
        outlined
      />
      <v-text-field
        v-model="searchName"
        placeholder="Поиск по названию фильма"
      />
      <v-container
        fluid
        class="pa-0"
      >
        <v-select
          v-model="selectedFruits"
          :items="genre"
          label="Выберите жанры"
          multiple
        >
          <template #prepend-item>
            <v-list-item
              ripple
              @mousedown.prevent
              @click="toggle"
            >
              <v-list-item-action>
                <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">
                  {{ icon }}
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
      </v-container>
    </v-card>
    <div v-if="!isBookLoading">
      <v-container>
        <v-row>
          {{ getAuthorBook }}
          <Book
            v-for="book in sortedAndGenreBook"
            :book="book"
            :is-button-main-page="true"
          />
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
		selectedFruits: [
			"История",
			"Фантастика",
			"Комедия",
			"Боевик",
			"Детектив",],
		selectedSort: "",
		searchName: "",
		searchAuthor: "",
		books: [],
		isBookLoading: false,
	}),
	computed: {
		sortedBooks() {
			return [...this.books].sort((a, b) => a[this.selectedSort] - b[this.selectedSort])
		},
		sortedAndSearchBook() {
			return [...this.sortedBooks].filter(book => book.title.toLowerCase().includes(this.searchName.toLowerCase()))
		},
		sortedAndGenreBook() {
			return [...this.sortedAndSearchBook].filter(book => this.selectedFruits.includes(book.genre))
		},
		likesAllFruit () {
			return this.selectedFruits.length === this.genre.length
		},
		likesSomeFruit () {
			return this.selectedFruits.length > 0 && !this.likesAllFruit
		},
		getAuthorBook() {
			return this.books.map(books => books.author);
		},
		icon () {
			if (this.likesAllFruit) return "mdi-close-box"
			if (this.likesSomeFruit) return "mdi-minus-box"
			return "mdi-checkbox-blank-outline"
		},
	},
	mounted() {
		this.getBooks();
	},
	methods: {
		async getBooks() {
			try {
				this.isBookLoading = true;
				setTimeout( async () => {
					const response = await api.get("/books");
					this.books = response.data;
					this.isBookLoading = false;
				},800)
			} catch (e) {
				console.log(e)
			}
		},
		toggle () {
			this.$nextTick(() => {
				if (this.likesAllFruit) {
					this.selectedFruits = []
				} else {
					this.selectedFruits = this.genre.slice()
				}
			})
		},
	},
}
</script>

<style>

</style>
