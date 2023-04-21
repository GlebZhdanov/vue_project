<template>
  <v-col cols="4">
    <div class="book" >
      <v-img
          :src="require('@/accets/img/cover' + book.image_id)"
          max-height="200"
          max-width="200"/>
      {{ book.title }}
      {{ book.author }}
    </div>
    <v-btn v-if='isDeleteButton' @click="deleteBook">
      Удалить из корзины
    </v-btn>
    <v-btn v-else @click="addBook" disabled >
      Добавить в корзину
    </v-btn>
  </v-col>
</template>

<script>
import { mapMutations } from 'vuex';

  export default {
    props: {
      book: {
        type: Object,
        required: true,
      },
      isDeleteButton: {
        type: Boolean,
        require: true,
      }
    },
    methods: {
      ...mapMutations([
        'addBasketBook',
        'deleteBasketBook',
      ]),
      addBook() {
        this.addBasketBook(this.book)
       },
      deleteBook() {
        this.deleteBasketBook(this.book)
      },
    },
  }
</script>

<style>

.book {
  background-color: antiquewhite;
  width: 200px;
  cursor: pointer;
}
</style>
