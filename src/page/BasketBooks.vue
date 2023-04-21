<template>
  <div>
    <v-container>
      <v-row>
        <Book
            v-for="book in $store.getters.getAllBasketBooks"
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
  }
</script>

<style>

</style>
