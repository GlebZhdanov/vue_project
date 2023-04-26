<template>
  <div>
    <v-row align="center">
      <v-col
        class="flex-column"
        sm="5"
      >
        <v-select
          v-model="selectedSort"
          class="mt-6"
          id-items:
          :items="items"
          label="Сортировать"
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
      </v-col>
    </v-row>
    <div v-if="!isBookLoading">
      <v-btn
        elevation="2"
        raised
        @click="postBooksTest"
      >
        Получить книги
      </v-btn>
      <v-container>
        <v-row>
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
		books: [],
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
		async postBooksTest() {
			try {
				await Promise.all(
					this.booksTest.map(async book => await api.post("/books",book))
				)
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
	}
}
</script>

<style>

</style>
