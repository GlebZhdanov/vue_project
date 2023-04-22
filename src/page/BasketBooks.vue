<template>
  <div>
    <v-container>
      <v-row>
        <Book
          v-for="book in allBookBasket"
          :book="book"
          :is-delete-button="true"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Book from "@/components/Book";

export default {
	components: {Book},
	computed: {
		allBookBasket() {
			return this.$store.getters.getAllBasketBooks
		}
	}
}
</script>

<style>

</style>
