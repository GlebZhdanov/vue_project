<template>
  <div>
    <h2
      v-if="books.length <= 0 && !isBookLoading"
      class="grey--text text-darken-1 text-center pt-10"
    >
      Создайте книги
    </h2>
    <div v-if="!isBookLoading && books.length > 0">
      <BookItem
        :books="booksSortNewYear"
      />
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
import {api} from "@/api/api";
import Loader from "@/components/Loader";
import AlertRequest from "@/components/AlertRequest";
import BookItem from "@/components/BookItem";
export default {
	name: "MainPage",
	components: {BookItem,AlertRequest,Loader},
	data: () => ({
		books: [],
		isBookLoading: false,
		isErrorRequestPage: false,
	}),
	computed: {
		booksSortNewYear(){
			return this.books.slice().sort((a, b) => b["year"] - a["year"]);
		}
	},
	mounted() {
		this.getBooks();
	},
	methods: {
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
	},
}
</script>

<style>

</style>
