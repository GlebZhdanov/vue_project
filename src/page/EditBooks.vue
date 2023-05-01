<template>
  <div>
    <div>
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
        <h2
          v-if="books.length <= 0 && !isBookLoading"
          class="grey--text text-darken-1 text-center pt-10"
        >
          Создайте книги
        </h2>
        <div v-if="books.length > 0">
          <v-container
            class="d-flex flex-column justify-space-between pb-0"
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
                :is-button-edit-page="true"
              >
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
              </Book>
            </v-row>
          </v-container>
        </div>
        <Popup
          ref="modalNameAdd"
          :popup-close-trigger="popupCloseTrigger"
        >
          <FormBook
            :clear-trigger="formClearTrigger"
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
          :popup-close-trigger="popupCloseTrigger"
        >
          <FormBook
            v-model="booksEdit"
            :is-edit-book="true"
            @editBook="editPostBooks"
          />
          <AlertRequest
            :is-error-request="isErrorRequest"
            :is-success-request="isSuccessRequest"
            :is-popup="true"
          />
        </Popup>
        <AlertRequest
          :is-error-request="isErrorRequestPage"
          :is-success-request="isSuccessRequestPage"
        />
      </v-container>
    </div>
    <div>
      <Loader v-if="isBookLoading" />
    </div>
  </div>
</template>

<script>
import Book from "@/components/Book";
import Popup from "@/components/Popup";
import {api} from "@/api/api";
import AlertRequest from "@/components/AlertRequest";
import {booksTest} from "@/accets/const/constant";
import Loader from "@/components/Loader";
import FormBook from "@/components/FormBook";
import Toolbar from "@/components/Toolbar";
export default {
	components: {Toolbar,FormBook,Loader,AlertRequest,Book,Popup},
	data: () => ({
		selectedGenre: [],
		selectedAuthor: [],
		selectedYear: [],
		selectedSort: "",
		searchName: "",
		books: [],
		booksEdit: {},
		isSuccessRequest: false,
		isErrorRequest: false,
		isSuccessRequestPage: false,
		isErrorRequestPage: false,
		formClearTrigger: false,
		popupCloseTrigger: false,
		isBookLoading: false,
	}),
	computed: {
		filteredBooks() {
			let books = this.books.sort((a, b) => b["year"] - a["year"]);

			if (this.selectedSort) {
				books = books.sort((a,b) => a[this.selectedSort] - b[this.selectedSort])
			}
			if (this.searchName) {
				books = books.filter(book => book.title.toLowerCase().includes(this.searchName.toLowerCase()))
			}
			if (this.selectedGenre.length) {
				books = books.filter(book => this.selectedGenre.includes(book.genre))
			}
			if (this.selectedAuthor.length) {
				books = books.filter(book => this.selectedAuthor.includes(book.author))
			}
			if (this.selectedYear.length) {
				books = books.filter(book => this.selectedYear.includes(book.year))
			}

			return books;
		},

	},
	mounted() {
		this.getBooks();
	},
	methods: {
		async postBook(form) {
			try {
				await api.post("/books",form);
				this.isSuccessRequest = true;
				this.handlerRequest();
				await this.getBooks();
				this.formClearTrigger = !this.formClearTrigger;
			} catch (e) {
				this.isErrorRequest = true;
				console.log(e)
			}
		},
		async deleteBook(id) {
			try {
				await api.delete("/books/" + id);
				await this.getBooks();
			} catch (e) {
				this.isErrorRequestPage = true;
				console.log(e);
			}
		},
		async getBooks() {
			this.isBookLoading = true;
			try {
				const response = await api.get("/books");
				this.books = response.data;
				this.isBookLoading = false;
			} catch (e) {
				this.isErrorRequestPage = true;
				console.log(e)
			} finally {
				this.isBookLoading = false;
			}
		},
		async editPostBooks() {
			try {
				await api.put("/books/" + this.booksEdit._id,{
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
					booksTest.map(async book => await api.post("/books",book))
				)
				this.isSuccessRequestPage = true;
				this.handlerRequest();
				await this.getBooks();
			} catch (e) {
				this.isErrorRequestPage = true;
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
				this.isSuccessRequestPage = false;
				this.isErrorRequestPage = false;
				this.popupCloseTrigger = !this.popupCloseTrigger;
			},1300)
		},
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
