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
            v-for="book in sortedAndAuthorBook"
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
		selectedGenre: [
			"История",
			"Фантастика",
			"Комедия",
			"Боевик",
			"Детектив",],
		selectedAuthor: [
			"Александра Маринина",
			"Ерофей Трофимов",
			"Толкин",
			"Anne Dar",
			"Сергей Лукьяненко",
			"Альбина Нури",
			"Прилепин",
			"Татьяна Устинова",
			"Елена Бриолле"],
		selectedSort: "",
		searchName: "",
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
			return [...this.sortedAndSearchBook].filter(book => this.selectedGenre.includes(book.genre))
		},
		sortedAndAuthorBook() {
			return [...this.sortedAndGenreBook].filter(book => this.selectedAuthor.includes(book.author))
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
	},
}
</script>

<style>

</style>
