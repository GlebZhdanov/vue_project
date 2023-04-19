<template>
  <v-container fluid>
    <v-app-bar
        color="blue"
        dark
    >
      <v-spacer></v-spacer>
      <v-bth class="ml-5">
        <router-link to="/">Просмотр книг</router-link>
      </v-bth>
      <v-bth class="ml-5">
        <router-link to="/basket">Корзина</router-link>
      </v-bth>
      <v-bth class="ml-5">
        <router-link to="/edit">Редактировать книги</router-link>
      </v-bth>
    </v-app-bar>
  </v-container>
</template>

<script>

export default {
  name: 'Navbar'
}

</script>

<style>

</style>
